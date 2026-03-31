declare module 'gsap-trial/SplitText' {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(target: gsap.DOMTarget, vars?: object);
    revert(): void;
  }
}

declare module 'gsap-trial/ScrollSmoother' {
  export class ScrollSmoother {
    static create(vars?: object): ScrollSmoother;
    paused(value?: boolean): boolean | ScrollSmoother;
  }
}
