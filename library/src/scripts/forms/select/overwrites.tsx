/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import ButtonLoader from "@library/loaders/ButtonLoader";
import { tokensClasses } from "@library/forms/select/tokensStyles";
import { t } from "@library/utility/appUtils";
import { ButtonTypes } from "@library/forms/buttonTypes";
import { dropDownClasses } from "@library/flyouts/dropDownStyles";
import { MultiValueRemoveProps } from "react-select/lib/components/MultiValue";
import { MenuListComponentProps, MenuProps } from "react-select/lib/components/Menu";
import { ControlProps } from "react-select/lib/components/Control";
import { ValueContainerProps } from "react-select/lib/components/containers";
import classNames from "classnames";
import { OptionProps } from "react-select/lib/components/Option";
import { components } from "react-select";
import { CloseTinyIcon, CheckCompactIcon, DownTriangleIcon } from "@library/icons/common";
import { IComboBoxOption } from "@library/features/search/SearchBar";
import { selectOneClasses } from "@library/forms/select/selectOneStyles";
import { GroupProps } from "react-select/lib/components/Group";

/**
 * Overwrite for the controlContainer component in React Select
 * @param props
 */
export function Control(props: ControlProps<any>) {
    const { className, ...rest } = props;
    return <components.Control className={classNames("suggestedTextInput-control", className)} {...rest} />;
}

/**
 * Overwrite for the menuOption component in React Select
 * @param props
 */
export function OptionLoader(props: OptionProps<any>) {
    props = {
        ...props,
        children: <ButtonLoader />,
    };

    return <SelectOption {...props} value="" />;
}

/**
 * Overwrite for the menu component in React Select
 * @param props - menu props
 */
export function Menu(props: MenuProps<any>) {
    const classes = dropDownClasses();
    return (
        <components.Menu
            {...props}
            className={classNames("suggestedTextInput-menu", "dropDown-contents", "isParentWidth", classes.contents)}
        />
    );
}

/**
 * Overwrite for the input menuList component in React Select
 * @param props - props for menuList
 */
export function MenuList(props: MenuListComponentProps<any>) {
    const { ...rest } = props;

    return (
        <components.MenuList {...rest}>
            <ul className="suggestedTextInput-menuItems">{props.children}</ul>
        </components.MenuList>
    );
}

/**
 * Overwrite for the multiValueRemove component in React Select
 * @param props - props of component
 */
export function MultiValueRemove(props: MultiValueRemoveProps<any>) {
    const { innerProps, selectProps } = props;
    const classesTokens = tokensClasses();

    // We need to bind the function to the props for that component
    const handleKeyDown = (event) => {
        switch (event.key) {
            case "Enter":
            case "Spacebar":
            case " ":
                innerProps.onClick(event);
                break;
        }
    };

    return (
        <components.MultiValueRemove {...props} className="suggestedTextInput-tokenRemove">
            <button
                {...innerProps}
                className={classNames(ButtonTypes.CUSTOM, `${selectProps.classNamePrefix}-clear`)}
                type="button"
                style={{}}
                aria-hidden={undefined} // Unset the prop in restInnerProps
                onKeyDown={handleKeyDown}
                onClick={innerProps.onClick}
                onTouchEnd={innerProps.onTouchEnd}
                onMouseDown={innerProps.onMouseDown}
                title={t("Clear")}
                aria-label={t("Clear")}
            >
                <CloseTinyIcon className={classNames("suggestedTextInput-tokenRemoveIcon", classesTokens.removeIcon)} />
            </button>
        </components.MultiValueRemove>
    );
}

/**
 * Overwrite for the noOptionsMessage component in React Select
 * @param props
 */
export function NoOptionsMessage(props: OptionProps<any>) {
    props = {
        ...props,
        className: classNames("suggestedTextInput-noOptions", props.className),
    };
    return <components.NoOptionsMessage {...props} />;
}

export function NullComponent() {
    return <></>;
}

type ISelectOptionOverwrite = OptionProps<any> & IComboBoxOption;

/**
 * Overwrite for the menuOption component in React Select
 * @param props
 */
export function SelectOption(props: ISelectOptionOverwrite) {
    const { isSelected, isFocused, selectProps, value } = props;

    return (
        <li className="suggestedTextInput-item">
            <button
                {...(props.innerProps as any)}
                type="button"
                className={classNames("suggestedTextInput-option", {
                    isSelected,
                    isFocused,
                })}
            >
                <span className="suggestedTextInput-head">
                    <span className="suggestedTextInput-title">
                        {props.children}
                        {props.data?.data?.parentLabel && (
                            <span
                                className={"suggestedTextInput-parentTag"}
                            >{` - ${props.data.data.parentLabel}`}</span>
                        )}
                    </span>
                    {(isSelected || value === selectProps.value?.value) && (
                        <CheckCompactIcon className={selectOneClasses().checkIcon} />
                    )}
                </span>
            </button>
        </li>
    );
}

/**
 * Overwrite for the Group component in React Select
 */
export function Group(props: GroupProps<ISelectOptionOverwrite>) {
    return (
        <>
            <li className="suggestedTextInput-item">
                <span className="suggestedTextInput-groupHeading">{props.label}</span>
            </li>
            {props.children}
        </>
    );
}

/**
 * Overwrite for the valueContainer component in React Select
 * @param children
 * @param props
 */
export function ValueContainer(props: ValueContainerProps<any>) {
    return (
        <components.ValueContainer
            {...props}
            className={classNames("suggestedTextInput-valueContainer inputBlock-inputText inputText", props.className)}
        />
    );
}

/**
 * Overwrite for the DropdownIndicator component in React Select
 * @param props - props of component
 */
export function DropdownIndicator(props) {
    const { innerProps } = props;
    const Component: React.ComponentType = components.DropdownIndicator as any;
    return (
        <Component {...props}>
            <div {...innerProps}>
                <DownTriangleIcon className={selectOneClasses().chevron} />
            </div>
        </Component>
    );
}
