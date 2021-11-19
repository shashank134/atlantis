import React, {
  ChangeEvent,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { Button } from "../Button";

export interface DatePickerActivatorProps
  extends Pick<
    ReactDatePickerProps,
    | "value"
    | "id"
    | "name"
    | "autoFocus"
    | "placeholderText"
    | "disabled"
    | "autoComplete"
    | "readOnly"
    | "required"
    | "tabIndex"
    | "ariaDescribedBy"
    | "ariaInvalid"
    | "ariaLabelledBy"
    | "ariaRequired"
  > {
  readonly activator?:
    | ReactElement
    | ((props: DatePickerActivatorProps) => ReactElement);
  onBlur?(): void;
  onChange?(
    event?: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  onClick?(): void;
  onFocus?(): void;
  onKeyDown?(): void;
}

export const DatePickerActivator = forwardRef(InternalActivator);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function InternalActivator(props: DatePickerActivatorProps, _ref: unknown) {
  const { activator } = props;
  if (activator) {
    return isValidElement(activator)
      ? cloneElement(activator, props)
      : activator(props);
  } else {
    return (
      <Button
        variation="work"
        type="tertiary"
        icon="calendar"
        ariaLabel="Open Datepicker"
        {...props}
      />
    );
  }
}
