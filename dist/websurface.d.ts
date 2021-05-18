export declare const component: import("aframe").ComponentConstructor<{
    schema: {
        url: {
            default: string;
        };
        width: {
            default: number;
        };
        height: {
            default: number;
        };
        frameSkips: {
            default: number;
        };
        autoSceneStyling: {
            default: boolean;
        };
    };
    init: () => void;
    tick: () => void;
}>;
