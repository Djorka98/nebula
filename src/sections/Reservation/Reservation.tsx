import { AnimatePresence, m } from 'framer-motion';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { fade, floatIn, scaleIn, slideUp, stagger, viewport } from '@/animations/motion';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { copy } from '@/data/copy';
import { cx } from '@/lib/cx';
import { typography } from '@/styles/typography.css';

import styles from './Reservation.module.scss';

const NOTES_MAX_LENGTH = 280;
const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[-\d\s()]{8,18}$/;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  region: string;
  color: string;
  storage: string;
  notes: string;
  updates: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ValidatorMap = {
  [Key in keyof FormValues]?: (value: FormValues[Key], values: FormValues) => string | undefined;
};

type SelectField = 'region' | 'color' | 'storage';

const REQUIRED_FIELDS: Array<keyof FormValues> = ['name', 'email', 'phone', 'region', 'color', 'storage'];

const fieldIds = {
  name: 'reservation-name',
  email: 'reservation-email',
  phone: 'reservation-phone',
  region: 'reservation-region',
  color: 'reservation-color',
  storage: 'reservation-storage',
  notes: 'reservation-notes',
  updates: 'reservation-updates'
} as const;

const helperIds = {
  phone: 'reservation-phone-helper',
  notes: 'reservation-notes-helper'
} as const;

const Reservation = (): JSX.Element => {
  const reservationCopy = copy.reservation;
  const colorOptions = copy.colorPicker.colors;
  const storageOptions = copy.configurator.options.storage;

  const fieldValidators = useMemo<ValidatorMap>(
    () => ({
      name: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return 'Ingresa tu nombre completo.';
        }
        if (!NAME_PATTERN.test(trimmed)) {
          return 'Escribe nombre y apellido usando solo letras.';
        }
        return undefined;
      },
      email: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return 'Necesitamos tu correo electrónico.';
        }
        if (!EMAIL_PATTERN.test(trimmed)) {
          return 'Añade un correo válido.';
        }
        return undefined;
      },
      phone: (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return 'Comparte un número de contacto.';
        }
        if (!PHONE_PATTERN.test(trimmed)) {
          return 'Añade un número válido con lada internacional.';
        }
        return undefined;
      },
      region: (value) => (!value ? 'Selecciona tu región.' : undefined),
      color: (value) => (!value ? 'Elige un acabado preferido.' : undefined),
      storage: (value) => (!value ? 'Selecciona la memoria que necesitas.' : undefined)
    }),
    []
  );

  const getFieldErrorMessage = <K extends keyof FormValues>(field: K, values: FormValues) => {
    const validator = fieldValidators[field];
    return validator ? validator(values[field], values) : undefined;
  };

  const createDefaultValues = () => ({
    name: '',
    email: '',
    phone: '',
    region: '',
    color: '',
    storage: '',
    notes: '',
    updates: false
  });

  const [formValues, setFormValues] = useState<FormValues>(() => createDefaultValues());
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [activeSelect, setActiveSelect] = useState<SelectField | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  }, []);

  const handleChange = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = field === 'updates' && event.target instanceof HTMLInputElement
      ? event.target.checked
      : event.target.value;

    setFormValues((prev) => {
      const nextValues = {
        ...prev,
        [field]: value
      } as FormValues;

      setErrors((prevErrors) => {
        const message = getFieldErrorMessage(field, nextValues);

        if (message) {
          if (prevErrors[field] === message) {
            return prevErrors;
          }
          return {
            ...prevErrors,
            [field]: message
          };
        }

        if (prevErrors[field]) {
          const { [field]: _removed, ...rest } = prevErrors;
          return rest;
        }

        return prevErrors;
      });

      return nextValues;
    });
  };

  const validate = (values: FormValues) => {
    const nextErrors: FormErrors = {};

    REQUIRED_FIELDS.forEach((field) => {
      const message = getFieldErrorMessage(field, values);
      if (message) {
        nextErrors[field] = message;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate(formValues)) {
      return;
    }

    setErrors({});
    setActiveSelect(null);
    setStatus('loading');

    const normalizedValues: FormValues = {
      ...formValues,
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      notes: formValues.notes.trim()
    };

    setSubmittedData(normalizedValues);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const handleReset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setFormValues(createDefaultValues());
    setSubmittedData(null);
    setErrors({});
    setActiveSelect(null);
    setStatus('idle');
  };

  const selectedColor = useMemo(
    () => submittedData
      ? colorOptions.find((color) => color.id === submittedData.color)
      : undefined,
    [submittedData, colorOptions]
  );

  const selectedStorage = useMemo(
    () => submittedData
      ? storageOptions.find((option) => option.value === submittedData.storage)
      : undefined,
    [submittedData, storageOptions]
  );

  const currentColor = useMemo(
    () => colorOptions.find((color) => color.id === formValues.color),
    [colorOptions, formValues.color]
  );

  const currentStorage = useMemo(
    () => storageOptions.find((option) => option.value === formValues.storage),
    [storageOptions, formValues.storage]
  );

  const getDescribedBy = (field: keyof FormValues) => {
    const ids: string[] = [];

    if (errors[field]) {
      ids.push(`${fieldIds[field]}-error`);
    }

    if (field === 'phone') {
      ids.push(helperIds.phone);
    }

    if (field === 'notes') {
      ids.push(helperIds.notes);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
  };

  const remainingCharacters = Math.max(0, NOTES_MAX_LENGTH - formValues.notes.length);
  const isSubmitDisabled = status === 'loading'
    || REQUIRED_FIELDS.some((field) => Boolean(getFieldErrorMessage(field, formValues)));

  return (
    <m.section
      className="section"
      aria-labelledby="reservation-heading"
      id="reservar"
      variants={stagger(0.12, 0.16)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div className={cx('container', styles.reservation)}>
        <m.div className={styles.surface} variants={stagger(0.1, 0.18)}>
          <div className={styles.columns}>
            <m.div className={cx(styles.info, styles['v-group'])} variants={stagger(0.08)}>
              <m.div variants={fade(0)}>
                <Badge tone="brand" size="sm" className={styles.badge}>
                  {reservationCopy.badge}
                </Badge>
              </m.div>
              <m.h2
                id="reservation-heading"
                className={cx(styles.title, typography.subhead, 'h-tight')}
                variants={slideUp(0.06, 22)}
              >
                {reservationCopy.title}
              </m.h2>
              <m.p
                className={cx(styles.description, typography.body, 'clamp-4')}
                variants={slideUp(0.1, 20)}
              >
                {reservationCopy.description}
              </m.p>
              <m.div className={styles.perks} variants={stagger(0.06)}>
                {reservationCopy.perks.map((perk) => (
                  <m.div key={perk.label} className={styles.perk} variants={floatIn(0.08)}>
                    <span className={styles.perkLabel}>{perk.label}</span>
                    <strong className={styles.perkValue}>{perk.value}</strong>
                    <p className={styles.perkDescription}>{perk.description}</p>
                  </m.div>
                ))}
              </m.div>
              <m.ul className={styles.timeline} variants={stagger(0.06)}>
                {reservationCopy.timeline.map((step, index) => (
                  <m.li key={step.title} className={styles.timelineItem} variants={scaleIn(0.06)}>
                    <span className={styles.timelineBadge}>Paso {index + 1}</span>
                    <div className={styles.timelineContent}>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </m.li>
                ))}
              </m.ul>
              <m.p className={cx(styles.note, typography.caption)} variants={fade(0.12)}>
                {reservationCopy.note}
              </m.p>
            </m.div>
            <m.div className={styles.formCard} variants={floatIn(0.12)}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <m.div
                    key="success"
                    className={styles.success}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    aria-live="polite"
                  >
                    <span className={styles.successBadge}>Solicitud enviada</span>
                    <h3 className={cx(styles.successTitle, 'h-tight')}>
                      {reservationCopy.form.successTitle}
                    </h3>
                    <p className={styles.successBody}>{reservationCopy.form.successBody}</p>
                    {submittedData && (
                      <div className={styles.successSummary}>
                        <span>
                          Confirmaremos en <strong>{submittedData.email}</strong>
                        </span>
                        <span>
                          Número de contacto: <strong>{submittedData.phone}</strong>
                        </span>
                        <span>
                          Región elegida: <strong>{submittedData.region}</strong>
                        </span>
                        {selectedColor && (
                          <span>
                            Acabado preferido: <strong>{selectedColor.name}</strong>
                          </span>
                        )}
                        {selectedStorage && (
                          <span>
                            Memoria solicitada: <strong>{selectedStorage.label}</strong>
                          </span>
                        )}
                        {submittedData.notes && (
                          <span>
                            Nota enviada: <strong>{submittedData.notes}</strong>
                          </span>
                        )}
                      </div>
                    )}
                    <div className={styles.successActions}>
                      <Button variant="secondary" size="md" onClick={handleReset}>
                        Enviar otra solicitud
                      </Button>
                    </div>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className={styles.field}>
                      <label htmlFor={fieldIds.name}>Nombre completo</label>
                      <input
                        id={fieldIds.name}
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre completo"
                        value={formValues.name}
                        onChange={handleChange('name')}
                        className={styles.input}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-required="true"
                        aria-describedby={getDescribedBy('name')}
                        disabled={status === 'loading'}
                        data-invalid={errors.name ? 'true' : undefined}
                        required
                      />
                      <AnimatePresence initial={false}>
                        {errors.name && (
                          <m.span
                            key="name-error"
                            id={`${fieldIds.name}-error`}
                            role="alert"
                            className={styles.error}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          >
                            {errors.name}
                          </m.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={fieldIds.email}>Correo electrónico</label>
                      <input
                        id={fieldIds.email}
                        type="email"
                        autoComplete="email"
                        placeholder="tunombre@correo.com"
                        value={formValues.email}
                        onChange={handleChange('email')}
                        className={styles.input}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-required="true"
                        aria-describedby={getDescribedBy('email')}
                        disabled={status === 'loading'}
                        data-invalid={errors.email ? 'true' : undefined}
                        required
                      />
                      <AnimatePresence initial={false}>
                        {errors.email && (
                          <m.span
                            key="email-error"
                            id={`${fieldIds.email}-error`}
                            role="alert"
                            className={styles.error}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          >
                            {errors.email}
                          </m.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={fieldIds.phone}>{reservationCopy.form.phoneLabel}</label>
                      <input
                        id={fieldIds.phone}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={reservationCopy.form.phonePlaceholder}
                        value={formValues.phone}
                        onChange={handleChange('phone')}
                        className={styles.input}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-required="true"
                        aria-describedby={getDescribedBy('phone')}
                        disabled={status === 'loading'}
                        data-invalid={errors.phone ? 'true' : undefined}
                        pattern="^[+]?[0-9\\s()\-]{8,18}$"
                        required
                      />
                      <AnimatePresence initial={false}>
                        {errors.phone && (
                          <m.span
                            key="phone-error"
                            id={`${fieldIds.phone}-error`}
                            role="alert"
                            className={styles.error}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          >
                            {errors.phone}
                          </m.span>
                        )}
                      </AnimatePresence>
                      <span id={helperIds.phone} className={styles.helper}>
                        {reservationCopy.form.phoneHelper}
                      </span>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={fieldIds.region}>Región de entrega</label>
                      <div
                        className={styles.selectWrapper}
                        data-invalid={errors.region ? 'true' : undefined}
                        data-open={activeSelect === 'region' ? 'true' : undefined}
                      >
                        <select
                          id={fieldIds.region}
                          value={formValues.region}
                          onChange={(event) => {
                            handleChange('region')(event);
                            setActiveSelect(null);
                          }}
                          className={styles.select}
                          aria-invalid={errors.region ? 'true' : 'false'}
                          aria-required="true"
                          aria-describedby={getDescribedBy('region')}
                          disabled={status === 'loading'}
                          data-invalid={errors.region ? 'true' : undefined}
                          onBlur={() => {
                            setActiveSelect((current) => (current === 'region' ? null : current));
                          }}
                          onPointerDown={() => {
                            setActiveSelect('region');
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Escape') {
                              setActiveSelect(null);
                            } else if (
                              event.key === ' '
                              || event.key === 'Space'
                              || event.key === 'Spacebar'
                              || event.key === 'Enter'
                              || event.key === 'ArrowDown'
                              || event.key === 'ArrowUp'
                            ) {
                              setActiveSelect('region');
                            }
                          }}
                          required
                        >
                          <option value="" disabled>
                            Selecciona tu región
                          </option>
                          {reservationCopy.regions.map((region) => (
                            <option key={region} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                        <span className={styles.selectIcon} aria-hidden="true" />
                      </div>
                      <AnimatePresence initial={false}>
                        {errors.region && (
                          <m.span
                            key="region-error"
                            id={`${fieldIds.region}-error`}
                            role="alert"
                            className={styles.error}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          >
                            {errors.region}
                          </m.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={styles.inlineFields}>
                      <div className={styles.field}>
                        <label htmlFor={fieldIds.color}>Acabado preferido</label>
                        <div
                          className={styles.selectWrapper}
                          data-invalid={errors.color ? 'true' : undefined}
                          data-open={activeSelect === 'color' ? 'true' : undefined}
                        >
                          <select
                            id={fieldIds.color}
                            value={formValues.color}
                            onChange={(event) => {
                              handleChange('color')(event);
                              setActiveSelect(null);
                            }}
                            className={styles.select}
                            aria-invalid={errors.color ? 'true' : 'false'}
                            aria-required="true"
                            aria-describedby={getDescribedBy('color')}
                            disabled={status === 'loading'}
                            data-invalid={errors.color ? 'true' : undefined}
                            onBlur={() => {
                              setActiveSelect((current) => (current === 'color' ? null : current));
                            }}
                            onPointerDown={() => {
                              setActiveSelect('color');
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Escape') {
                                setActiveSelect(null);
                              } else if (
                                event.key === ' '
                                || event.key === 'Space'
                                || event.key === 'Spacebar'
                                || event.key === 'Enter'
                                || event.key === 'ArrowDown'
                                || event.key === 'ArrowUp'
                              ) {
                                setActiveSelect('color');
                              }
                            }}
                            required
                          >
                            <option value="" disabled>
                              Selecciona un acabado
                            </option>
                            {colorOptions.map((color) => (
                              <option key={color.id} value={color.id}>
                                {color.name}
                              </option>
                            ))}
                          </select>
                          <span className={styles.selectIcon} aria-hidden="true" />
                        </div>
                        <AnimatePresence initial={false}>
                          {errors.color && (
                            <m.span
                              key="color-error"
                              id={`${fieldIds.color}-error`}
                              role="alert"
                              className={styles.error}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                              {errors.color}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className={styles.field}>
                        <label htmlFor={fieldIds.storage}>Memoria neural</label>
                        <div
                          className={styles.selectWrapper}
                          data-invalid={errors.storage ? 'true' : undefined}
                          data-open={activeSelect === 'storage' ? 'true' : undefined}
                        >
                          <select
                            id={fieldIds.storage}
                            value={formValues.storage}
                            onChange={(event) => {
                              handleChange('storage')(event);
                              setActiveSelect(null);
                            }}
                            className={styles.select}
                            aria-invalid={errors.storage ? 'true' : 'false'}
                            aria-required="true"
                            aria-describedby={getDescribedBy('storage')}
                            disabled={status === 'loading'}
                            data-invalid={errors.storage ? 'true' : undefined}
                            onBlur={() => {
                              setActiveSelect((current) => (current === 'storage' ? null : current));
                            }}
                            onPointerDown={() => {
                              setActiveSelect('storage');
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Escape') {
                                setActiveSelect(null);
                              } else if (
                                event.key === ' '
                                || event.key === 'Space'
                                || event.key === 'Spacebar'
                                || event.key === 'Enter'
                                || event.key === 'ArrowDown'
                                || event.key === 'ArrowUp'
                              ) {
                                setActiveSelect('storage');
                              }
                            }}
                            required
                          >
                            <option value="" disabled>
                              Selecciona memoria
                            </option>
                            {storageOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span className={styles.selectIcon} aria-hidden="true" />
                        </div>
                        <AnimatePresence initial={false}>
                          {errors.storage && (
                            <m.span
                              key="storage-error"
                              id={`${fieldIds.storage}-error`}
                              role="alert"
                              className={styles.error}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                              {errors.storage}
                            </m.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={fieldIds.notes}>Notas para el equipo</label>
                      <textarea
                        id={fieldIds.notes}
                        rows={4}
                        placeholder="Comparte contexto adicional, horarios o preferencias."
                        value={formValues.notes}
                        onChange={handleChange('notes')}
                        className={styles.textarea}
                        aria-describedby={getDescribedBy('notes')}
                        aria-invalid={errors.notes ? 'true' : 'false'}
                        data-invalid={errors.notes ? 'true' : undefined}
                        maxLength={NOTES_MAX_LENGTH}
                        disabled={status === 'loading'}
                      />
                      <AnimatePresence initial={false}>
                        {errors.notes && (
                          <m.span
                            key="notes-error"
                            id={`${fieldIds.notes}-error`}
                            role="alert"
                            className={styles.error}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                          >
                            {errors.notes}
                          </m.span>
                        )}
                      </AnimatePresence>
                      <div className={styles.fieldMeta}>
                        <span id={helperIds.notes} className={styles.helper}>
                          {reservationCopy.form.notesHelper}
                        </span>
                        <span className={styles.charCounter} aria-live="polite">
                          {remainingCharacters} caracteres restantes
                        </span>
                      </div>
                    </div>
                    <label className={styles.checkbox} htmlFor={fieldIds.updates}>
                      <input
                        id={fieldIds.updates}
                        type="checkbox"
                        checked={formValues.updates}
                        onChange={handleChange('updates')}
                        disabled={status === 'loading'}
                      />
                      <span>Quiero recibir novedades y eventos exclusivos de Nebula Labs.</span>
                    </label>
                    <div className={styles.actionsRow}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={status === 'loading'}
                        disabled={isSubmitDisabled}
                        loadingLabel={reservationCopy.form.loadingLabel}
                      >
                        {reservationCopy.form.submitLabel}
                      </Button>
                      <span className={styles.actionHint}>{reservationCopy.note}</span>
                    </div>
                    <div className={styles.formFooter} aria-live="polite">
                      <div className={styles.previewCard}>
                        <span className={styles.previewBadge}>{reservationCopy.form.previewTitle}</span>
                        <strong className={styles.previewTitle}>
                          {currentColor?.name ?? 'Selecciona un color'}
                        </strong>
                        <span className={styles.previewMeta}>
                          {currentStorage?.label ?? 'Memoria pendiente'}
                        </span>
                        <p className={styles.previewBody}>{reservationCopy.form.previewDescription}</p>
                      </div>
                      <div className={styles.supportCard}>
                        <span className={styles.supportBadge}>{reservationCopy.form.supportTitle}</span>
                        <p className={styles.supportBody}>{reservationCopy.form.supportBody}</p>
                        <a
                          className={styles.supportLink}
                          href={`mailto:${copy.footer.contact.email}`}
                        >
                          {reservationCopy.form.supportAction}
                        </a>
                      </div>
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
              <p className={cx(styles.legal, typography.caption)}>{reservationCopy.legal}</p>
            </m.div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
};

export default Reservation;
