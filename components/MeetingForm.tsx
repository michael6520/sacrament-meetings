'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { FormState, FormValues } from '@/lib/meeting-form-utils';

const inputClass =
  'w-full rounded-card border border-border bg-card-bg px-3 py-2 text-sm text-foreground placeholder:text-foreground/50';

interface FieldProps {
  name: string;
  label: string;
  state: FormState;
  hint?: string;
  as?: 'input' | 'textarea' | 'select';
  type?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

function Field({
  name,
  label,
  state,
  hint,
  as = 'input',
  type = 'text',
  rows = 3,
  options = [],
}: FieldProps) {
  const errors = state.errors[name];
  const hasError = !!errors?.length;
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [hint ? hintId : null, errorId].filter(Boolean).join(' ');

  const common = {
    id: name,
    name,
    defaultValue: state.values[name] ?? '',
    'aria-describedby': describedBy,
    'aria-invalid': hasError || undefined,
    className: inputClass,
  };

  let control;
  if (as === 'textarea') {
    control = <textarea rows={rows} {...common} />;
  } else if (as === 'select') {
    control = (
      <select {...common}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        type={type}
        {...(type === 'number' ? { min: 1, inputMode: 'numeric' as const } : {})}
        {...common}
      />
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-foreground/70">
          {hint}
        </p>
      )}
      <div className="mt-1">{control}</div>
      <div id={errorId} aria-live="polite" className="mt-1 text-sm text-red-400">
        {errors?.map((e) => <p key={e}>{e}</p>)}
      </div>
    </div>
  );
}

interface MeetingFormProps {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialValues: FormValues;
  submitLabel: string;
}

export default function MeetingForm({ action, initialValues, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    message: null,
    errors: {},
    values: initialValues,
  } satisfies FormState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div aria-live="polite" className="text-sm text-red-400">
        {state.message && <p role="alert">{state.message}</p>}
      </div>

      <Field name="date" label="Date" type="date" state={state} />
      <Field
        name="meetingType"
        label="Meeting type"
        as="select"
        state={state}
        options={[
          { value: 'regular', label: 'Regular' },
          { value: 'testimony', label: 'Testimony' },
          { value: 'stake', label: 'Stake' },
          { value: 'general', label: 'General' },
        ]}
      />
      <Field name="presiding" label="Presiding" state={state} />
      <Field name="conducting" label="Conducting" state={state} />
      <Field
        name="announcements"
        label="Announcements"
        as="textarea"
        state={state}
        hint="Optional. One announcement per line."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
        <Field name="openingHymnNumber" label="Opening hymn #" type="number" state={state} />
        <Field name="openingHymnTitle" label="Opening hymn title" state={state} />
      </div>
      <Field name="openingPrayer" label="Opening prayer" state={state} />

      <Field
        name="wardBusiness"
        label="Ward business"
        as="textarea"
        state={state}
        hint="Optional. One item per line."
      />

      <div>
        <div className="flex items-center gap-2">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={state.values.stakeBusiness === 'on'}
            className="h-4 w-4 accent-primary"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-foreground">
            Stake business will be conducted
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
        <Field name="sacramentHymnNumber" label="Sacrament hymn #" type="number" state={state} />
        <Field name="sacramentHymnTitle" label="Sacrament hymn title" state={state} />
      </div>

      <Field
        name="speakers"
        label="Speakers"
        as="textarea"
        rows={5}
        state={state}
        hint='One per line as "Name | Topic". For a musical number, use "Name | Musical Number".'
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[8rem_1fr]">
        <Field name="closingHymnNumber" label="Closing hymn #" type="number" state={state} />
        <Field name="closingHymnTitle" label="Closing hymn title" state={state} />
      </div>
      <Field name="closingPrayer" label="Closing prayer" state={state} />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-background disabled:opacity-60"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/meetings" className="text-sm text-foreground/70 hover:text-foreground">
          Cancel
        </Link>
      </div>
    </form>
  );
}