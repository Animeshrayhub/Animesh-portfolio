import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader, RGBELoader } from "three-stdlib";
import { decryptFile } from "./utils/decrypt";
import { gsap } from "gsap";

// Bone data for animations
const typingBoneNames = [
  "thighL", "thighR", "shinL", "shinR", "forearmL", "forearmR",
  "handL", "handR", "f_pinky03R", "f_pinky02L", "f_pinky02R",
  "f_pinky01L", "f_pinky01R", "palm04L", "palm04R", "f_ring01L",
  "thumb01L", "thumb01R", "thumb03L", "thumb03R", "palm02L",
  "palm02R", "palm01L", "palm01R", "f_index01L", "f_index01R",
  "palm03L", "palm03R", "f_ring02L", "f_ring02R", "f_ring01R",
  "f_ring03L", "f_ring03R", "f_middle01L", "f_middle02L",
  "f_middle03L", "f_middle01R", "f_middle02R", "f_middle03R",
  "f_index02L", "f_index03L", "f_index02R", "f_index03R",
  "thumb02L", "f_pinky03L", "upper_armL", "upper_armR", "thumb02R",
  "toeL", "heel02L", "toeR", "heel02R",
];
const eyebrowBoneNames = ["eyebrow_L", "eyebrow_R"];

const filterAnimationTracks = (
  clip: THREE.AnimationClip,
  boneNames: string[]
): THREE.AnimationClip => {
  const filteredTracks = clip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );
  return new THREE.AnimationClip(
    clip.name + "_filtered",
    clip.duration,
    filteredTracks
  );
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clipName: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const clip = THREE.AnimationClip.findByName(gltf.animations, clipName);
  if (!clip) return null;
  const filteredClip = filterAnimationTracks(clip, boneNames);
  return mixer.clipAction(filteredClip);
};

const CharacterScene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const [_loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    scene.background = null;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(18, aspect, 0.1, 1000);
    camera.position.set(0, 11.5, 28);
    camera.zoom = 0.95;
    camera.updateProjectionMatrix();

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
    directionalLight.position.set(-0.47, -0.32, -1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
    pointLight.position.set(3, 12, 4);
    pointLight.castShadow = true;
    scene.add(pointLight);

    new RGBELoader()
      .setPath("/models/")
      .load("char_enviorment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.environmentIntensity = 0;
        scene.environmentRotation.set(5.76, 85.85, 1);
      });

    let headBone: THREE.Object3D | null = null;
    let screenLight: any | null = null;
    let mixer: THREE.AnimationMixer;
    const clock = new THREE.Clock();

    // Load character
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    const loadCharacter = async () => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(blobUrl, async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              (child as THREE.Mesh).frustumCulled = true;
            }
          });

          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;

          // Hide the desk/laptop mesh (causing the white/gray box)
          const deskMesh = character.getObjectByName("Plane004");
          if (deskMesh) deskMesh.visible = false;
          const screenLightObj = character.getObjectByName("screenlight");
          if (screenLightObj) screenLightObj.visible = false;
          screenLight = null; // Don't reference hidden object

          character.getObjectByName("footR")!.position.y = 3.36;
          character.getObjectByName("footL")!.position.y = 3.36;

          // Setup animations
          mixer = new THREE.AnimationMixer(character);
          if (gltf.animations) {
            const introClip = gltf.animations.find(
              (clip) => clip.name === "introAnimation"
            );
            if (introClip) {
              const introAction = mixer.clipAction(introClip);
              introAction.setLoop(THREE.LoopOnce, 1);
              introAction.clampWhenFinished = true;
              introAction.play();
            }

            ["key1", "key2", "key5", "key6"].forEach((name) => {
              const clip = THREE.AnimationClip.findByName(gltf.animations, name);
              if (clip) {
                const action = mixer.clipAction(clip);
                action.play();
                action.timeScale = 1.2;
              }
            });

            const typingAction = createBoneAction(
              gltf, mixer, "typing", typingBoneNames
            );
            if (typingAction) {
              typingAction.enabled = true;
              typingAction.play();
              typingAction.timeScale = 1.2;
            }

            // Hover eyebrow
            if (hoverDivRef.current) {
              const eyeBrowUpAction = createBoneAction(
                gltf, mixer, "browup", eyebrowBoneNames
              );
              if (eyeBrowUpAction) {
                eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
                eyeBrowUpAction.clampWhenFinished = true;
                eyeBrowUpAction.enabled = true;
                let isHovering = false;
                hoverDivRef.current.addEventListener("mouseenter", () => {
                  if (!isHovering) {
                    isHovering = true;
                    eyeBrowUpAction.reset();
                    eyeBrowUpAction.enabled = true;
                    eyeBrowUpAction.setEffectiveWeight(4);
                    eyeBrowUpAction.fadeIn(0.5).play();
                  }
                });
                hoverDivRef.current.addEventListener("mouseleave", () => {
                  if (isHovering) {
                    isHovering = false;
                    eyeBrowUpAction.fadeOut(0.6);
                  }
                });
              }
            }
          }

          // Turn on lights after a delay
          setLoaded(true);
          setTimeout(() => {
            gsap.to(scene, {
              environmentIntensity: 0.64,
              duration: 2,
              ease: "power2.inOut",
            });
            gsap.to(directionalLight, {
              intensity: 1,
              duration: 2,
              ease: "power2.inOut",
            });
            gsap.to(".character-rim", {
              y: "55%",
              opacity: 1,
              delay: 0.2,
              duration: 2,
            });

            // Play intro animation
            if (gltf.animations) {
              const introClip = gltf.animations.find(
                (clip) => clip.name === "introAnimation"
              );
              if (introClip) {
                const introAction = mixer.clipAction(introClip);
                introAction.clampWhenFinished = true;
                introAction.reset().play();
                setTimeout(() => {
                  const blink = gltf.animations.find(
                    (clip) => clip.name === "Blink"
                  );
                  if (blink) mixer.clipAction(blink).play().fadeIn(0.5);
                }, 2500);
              }
            }
          }, 1000);

          // Handle resize
          const onResize = () => {
            if (!canvasDiv.current) return;
            const r = canvasDiv.current.getBoundingClientRect();
            renderer.setSize(r.width, r.height);
            camera.aspect = r.width / r.height;
            camera.updateProjectionMatrix();
          };
          window.addEventListener("resize", onResize);

          dracoLoader.dispose();
        });
      } catch (err) {
        console.error("Character load error:", err);
      }
    };

    loadCharacter();

    // Mouse tracking
    let mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (headBone && window.scrollY < 400) {
        const maxRotation = Math.PI / 6;
        headBone.rotation.y = THREE.MathUtils.lerp(
          headBone.rotation.y,
          mouse.x * maxRotation,
          interpolation.y
        );
        const minRotX = -0.3;
        const maxRotX = 0.4;
        if (mouse.y > minRotX) {
          if (mouse.y < maxRotX) {
            headBone.rotation.x = THREE.MathUtils.lerp(
              headBone.rotation.x,
              -mouse.y - 0.5 * maxRotation,
              interpolation.x
            );
          } else {
            headBone.rotation.x = THREE.MathUtils.lerp(
              headBone.rotation.x,
              -maxRotation - 0.5 * maxRotation,
              interpolation.x
            );
          }
        } else {
          headBone.rotation.x = THREE.MathUtils.lerp(
            headBone.rotation.x,
            -minRotX - 0.5 * maxRotation,
            interpolation.x
          );
        }

        if (screenLight) {
          if (screenLight.material.opacity > 0.9) {
            pointLight.intensity = screenLight.material.emissiveIntensity * 20;
          } else {
            pointLight.intensity = 0;
          }
        }
      }
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current) {
        const canvas = canvasDiv.current.querySelector("canvas");
        if (canvas) canvasDiv.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default CharacterScene;
