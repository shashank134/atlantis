import React, { ChangeEvent, ReactNode, Ref, useEffect, useState } from "react";
import classnames from "classnames";
import uuid from "uuid";
import { useForm, useFormContext } from "react-hook-form";
import styles from "./FormField.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { InputValidation, ValidationProps } from "../InputValidation";

export interface FormFieldProps {
  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * If you need to pass in a children. For example, `<options>` inside
   * `<select>`.
   */
  readonly children?: ReactNode;

  /**
   * Initial value of the input. Only use this when you need to pre-populate
   * the field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * **DEPRECATED** Use `validations` prop instead.
   *
   * Show an error message and highlight the the field red.
   */
  readonly errorMessage?: string;

  /**
   * Adjusts the form field to go inline with a content. This also silences the
   * given `validations` prop. You'd have to used the `onValidate` prop to
   * capture the message and render it somewhere else using the
   * `InputValidation` component.
   */
  readonly inline?: boolean;

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: boolean;

  /**
   * Specifies the maximum numerical or date value that a user can type
   */
  readonly max?: number;

  /**
   * Maximum character length for an input. This also changes the width to
   * roughly the same size as the max length. This is to communicate that the
   * user that on certain cases, they can only type a limited amount of
   * characters.
   */
  readonly maxLength?: number;

  /**
   * Specifies the minimum numerical or date value that a user can type
   */
  readonly min?: number;

  /**
   * Name of the input.
   */
  readonly name?: string;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder?: string;

  /**
   * Prevents users from editing the value.
   */
  readonly readonly?: boolean;

  /**
   * Exclusively for textareas. Specifies the visible height of a textarea.
   */
  readonly rows?: number;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";

  /**
   * Determines what kind of form field should the component give you.
   */
  readonly type?:
    | "text"
    | "password"
    | "number"
    | "time"
    | "textarea"
    | "select";

  /**
   * **EXPERIMENTAL** This feature is still under development.
   *
   * Show a success, error, warn, and info message above the field. This also
   * highlights the the field red if and error message shows up.
   */
  readonly validations?: ValidationProps[];

  /**
   * Set the component to the given value.
   */
  readonly value?: string | number;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string | number): void;

  /**
   * A callback to handle "Enter" keypress. This will only run
   * if Enter is the only key. Will not run if Shift or Control
   * are being held.
   */
  onEnter?(event: React.KeyboardEvent): void;

  /**
   * Focus callback.
   */
  onFocus?(): void;

  /**
   * Blur callback.
   */
  onBlur?(): void;

  /**
   * **DEPRECATED** Use `onValidation` prop instead.
   *
   * Callback to get the the status and message when validating a field
   * @param status
   * @param message
   */
  onValidate?(status: "pass" | "fail", message: string): void;

  /**
   * **EXPERIMENTAL** This feature is still under development.
   *
   * Callback to get the the status and message when validating a field
   * @param messages
   */
  onValidation?(messages: ValidationProps[]): void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valid?: any;
}

export const FormField = React.forwardRef(
  /**
   * Max statements is disabled for this component due the event handlers.
   */
  // eslint-disable-next-line max-statements
  (
    {
      align,
      children,
      defaultValue,
      disabled,
      errorMessage,
      inline,
      invalid,
      max,
      maxLength,
      min,
      name,
      onFocus,
      onBlur,
      onChange,
      onEnter,
      onValidate,
      onValidation,
      placeholder,
      readonly,
      rows,
      size,
      type = "text",
      value,
      validations,
      valid,
    }: FormFieldProps,
    ref: Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { register, errors, formState } =
      useFormContext() != undefined
        ? useFormContext()
        : useForm({ mode: "onBlur" });

    const [hasMiniLabel, setHasMiniLabel] = useState(
      shouldShowMiniLabel(defaultValue, value),
    );
    const identifier = uuid.v1();

    useEffect(() => {
      handleValidation();
      setHasMiniLabel(shouldShowMiniLabel(defaultValue, value));
    }, [value]);

    const wrapperClassNames = classnames(
      styles.wrapper,
      inline && styles.inline,
      size && styles[size],
      align && styles[align],
      disabled && styles.disabled,
      maxLength && styles.maxLength,
      {
        [styles.miniLabel]:
          (hasMiniLabel || type === "time" || type === "select") && placeholder,
        [styles.invalid]:
          invalid || errorMessage || hasErrorMessages(validations),
      },
    );

    const Wrapper = inline ? "span" : "div";

    const labelClassNames = classnames(
      styles.label,
      type === "textarea" && styles.textareaLabel,
    );

    return (
      <>
        {errorMessage && !inline && (
          <Text variation="error">{errorMessage}</Text>
        )}

        {validations && !inline && <InputValidation messages={validations} />}

        <Wrapper
          className={wrapperClassNames}
          style={{ ["--formField-maxLength" as string]: maxLength || max }}
        >
          <label className={labelClassNames} htmlFor={identifier}>
            {placeholder || " "}
          </label>
          {fieldElement()}
          {type === "select" && (
            <span className={styles.icon}>
              <Icon name="arrowDown" />
            </span>
          )}
        </Wrapper>
      </>
    );

    function fieldElement() {
      const fieldProps = {
        id: identifier,
        className: styles.formField,
        name: name,
        disabled: disabled,
        readOnly: readonly,
        onChange: handleChange,
        value: value,
        ...(defaultValue && { defaultValue: defaultValue }),
      };

      switch (type) {
        case "select":
          return <select {...fieldProps}>{children}</select>;
        case "textarea":
          return (
            <textarea
              rows={rows}
              onFocus={handleFocus}
              onKeyDown={event => handleKeyDown(event)}
              onBlur={handleBlur}
              ref={ref as Ref<HTMLTextAreaElement>}
              {...fieldProps}
            />
          );
        default:
          return (
            <>
              <input
                type={type}
                maxLength={maxLength}
                max={max}
                min={min}
                onFocus={handleFocus}
                onKeyDown={event => handleKeyDown(event)}
                onBlur={handleBlur}
                ref={e => {
                  if (ref) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    ref.current = e;
                  }
                  register(e, { ...valid });
                }}
                {...fieldProps}
              />
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                @ts-ignore */}
              {errors[name] && errors[name].message}
              {JSON.stringify(formState)}
            </>
          );
      }
    }

    function handleChange(
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>,
    ) {
      let newValue: string | number;
      newValue = event.currentTarget.value;
      setHasMiniLabel(newValue.length > 0);

      if (type === "number" && newValue.length > 0) {
        newValue = parseFloat(newValue);
      }
      onChange && onChange(newValue);
    }

    function handleFocus(
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>,
    ) {
      const target = event.currentTarget;
      setTimeout(() => readonly && target.select());

      onFocus && onFocus();
    }

    function handleBlur() {
      onBlur && onBlur();
    }

    function handleKeyDown(
      event:
        | React.KeyboardEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLTextAreaElement>,
    ) {
      if (!onEnter) return;
      if (event.key !== "Enter") return;
      if (event.shiftKey || event.ctrlKey) return;

      event.preventDefault();
      onEnter && onEnter(event);
    }

    function handleValidation() {
      const status = errorMessage ? "fail" : "pass";
      const message = errorMessage || "";
      onValidate && onValidate(status, message);

      const validationMessages = validations ? validations : [];
      onValidation && onValidation(validationMessages);
    }
  },
);

function shouldShowMiniLabel(
  defaultValue: string | number | undefined,
  value: string | number | undefined,
) {
  const activeValue = defaultValue || value;
  if (typeof activeValue === "string") {
    return activeValue.length > 0;
  } else {
    return activeValue != undefined;
  }
}

function hasErrorMessages(validations?: ValidationProps[]) {
  if (validations) {
    return validations.some(validation => {
      return (
        (validation.shouldShow || validation.shouldShow === undefined) &&
        validation.status === "error"
      );
    });
  }
  return false;
}
