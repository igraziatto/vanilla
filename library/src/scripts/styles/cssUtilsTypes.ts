/**
 * @copyright 2009-2020 Vanilla Forums Inc.
 * @license gpl-2.0-only
 */
import { BorderType } from "@library/styles/styleHelpersBorders";
import { Property } from "csstype";
import { ColorHelper } from "csx";
import { DeepPartial } from "redux";

export type TLength = string | number;
export type IRadiusValue = IBorderRadiusValue | IRadiusShorthand | IBorderRadiusOutput;
export type IBorderRadiusValue = Property.BorderRadius<TLength> | number | string | undefined;
export interface IRadiusShorthand {
    all?: IBorderRadiusValue;
    top?: IBorderRadiusValue;
    bottom?: IBorderRadiusValue;
    left?: IBorderRadiusValue;
    right?: IBorderRadiusValue;
}

export interface IBorderRadiusOutput {
    borderTopRightRadius?: IBorderRadiusValue;
    borderTopLeftRadius?: IBorderRadiusValue;
    borderBottomRightRadius?: IBorderRadiusValue;
    borderBottomLeftRadius?: IBorderRadiusValue;
}

export interface ISpacing {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    horizontal?: string | number;
    vertical?: string | number;
    all?: string | number;
}

export interface IFont {
    color?: ColorHelper | string;
    size?: Property.FontSize<TLength>;
    weight?: Property.FontWeight | number;
    lineHeight?: Property.LineHeight<TLength>;
    shadow?: Property.TextShadow;
    align?: Property.TextAlign;
    family?: Property.FontFamily[];
    transform?: Property.TextTransform;
    letterSpacing?: Property.LetterSpacing<TLength>;
    textDecoration?: "none" | "underline" | "auto";
}

export interface IBackground {
    color?: ColorHelper | string;
    attachment?: Property.BackgroundAttachment;
    position?: Property.BackgroundPosition<TLength>;
    repeat?: Property.BackgroundRepeat;
    size?: Property.BackgroundSize<TLength>;
    image?: Property.BackgroundImage;
    fallbackImage?: Property.BackgroundImage;
    opacity?: Property.Opacity;
    unsetBackground?: boolean; // do not apply background.
}

export interface IMixedBorderStyles extends IBorderStyles, ISimpleBorderStyle {}

interface IRadiusFlex {
    radius?: IRadiusValue;
}

export interface IBorderRadiusOptions {
    fallbackRadii?: object;
    debug?: boolean;
    isImportant?: boolean;
}

export interface ISimpleBorderStyle {
    color?: ColorHelper | string;
    width?: Property.BorderWidth<TLength>;
    style?: Property.BorderStyle;
    radius?: IRadiusValue;
}

export interface IBorderStyles extends ISimpleBorderStyle, IRadiusFlex {
    all?: ISimpleBorderStyle & IRadiusFlex;
    topBottom?: ISimpleBorderStyle & IRadiusFlex;
    leftRight?: ISimpleBorderStyle & IRadiusFlex;
    top?: ISimpleBorderStyle & IRadiusFlex;
    bottom?: ISimpleBorderStyle & IRadiusFlex;
    left?: ISimpleBorderStyle & IRadiusFlex;
    right?: ISimpleBorderStyle & IRadiusFlex;
}

export interface IStateColors {
    default?: ColorHelper | string;
    hover?: ColorHelper | string;
    focus?: ColorHelper | string;
    clickFocus?: ColorHelper | string;
    keyboardFocus?: ColorHelper | string;
    active?: ColorHelper | string;
    visited?: ColorHelper | string;
    allStates?: ColorHelper | string;
}
export interface ILinkColorOverwritesWithOptions extends IStateColors {
    skipDefault?: boolean;
}

export interface IClickableItemOptions {
    disableTextDecoration?: boolean;
}

/**
 * @deprecated Use Variables.border({}) instead.
 */
export const EMPTY_BORDER: Partial<ISimpleBorderStyle> = {
    color: undefined,
    width: undefined,
    style: undefined,
    radius: undefined,
};

/**
 * @deprecated Use Variables.fonts({}) instead.
 */
export const EMPTY_FONTS: IFont = {
    color: undefined,
    size: undefined,
    weight: undefined,
    lineHeight: undefined,
    shadow: undefined,
    align: undefined,
    family: undefined,
    transform: undefined,
    letterSpacing: undefined,
    textDecoration: undefined,
};

/**
 * @deprecated Use Variables.spacing({}) instead.
 */
export const EMPTY_SPACING = {
    top: undefined as undefined | number | string,
    right: undefined as undefined | number | string,
    bottom: undefined as undefined | number | string,
    left: undefined as undefined | number | string,
    horizontal: undefined as undefined | number | string,
    vertical: undefined as undefined | number | string,
    all: undefined as undefined | number | string,
};

/**
 * .@deprecated Use Variables.background({}) instead.
 */
export const EMPTY_BACKGROUND: IBackground = {
    color: undefined,
    attachment: undefined,
    position: undefined,
    repeat: undefined,
    size: undefined,
    image: undefined,
    opacity: undefined,
    unsetBackground: false,
};

/**
 * .@deprecated Use Variables.clickable({}) instead.
 */
export const EMPTY_STATE_COLORS = {
    default: undefined as undefined | ColorHelper,
    hover: undefined as undefined | ColorHelper,
    focus: undefined as undefined | ColorHelper,
    clickFocus: undefined as undefined | ColorHelper,
    keyboardFocus: undefined as undefined | ColorHelper,
    active: undefined as undefined | ColorHelper,
    visited: undefined as undefined | ColorHelper,
    allStates: undefined as undefined | ColorHelper,
};

export interface IGlobalBorderStyles extends IBorderRadiusOutput {
    color?: ColorHelper | string;
    width?: Property.BorderWidth<TLength> | number;
    style?: Property.BorderStyle;
    radius?: IRadiusValue;
}

export enum IIconSizes {
    SMALL = "small",
    DEFAULT = "default",
    LARGE = "large",
}

export enum ListSeparation {
    /**
     * Item 1
     * Item 2
     * Item 3
     */
    NONE = "none",

    /**
     * -------
     * |Item 1|
     * --------
     *
     * --------
     * |Item 2|
     * --------
     */
    BORDER = "border",
    /**
     * Item 1
     * -------
     * Item 2
     * -------
     * Item 3
     */
    SEPARATOR = "separator",
}

export enum LinkDecorationType {
    AUTO = "auto",
    ALWAYS = "always",
}

export interface IBoxOptions {
    borderType: BorderType;
    background: IBackground;
    spacing: ISpacing;
    border: ISimpleBorderStyle;
    itemSpacing: number;
    itemSpacingOnAllItems: boolean;
}

export type IPartialBoxOptions = DeepPartial<IBoxOptions> | undefined;

export interface IContentBoxes {
    depth1: IBoxOptions;
    depth2: IBoxOptions;
    depth3: IBoxOptions;
}