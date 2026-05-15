import React from "react";

type AkaNameGeneratorProps = {
  akaName: string | null;
  canGenerate: boolean;
  isLocked: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
  onLock: () => void;
  onUnlock: () => void;
};

export default function AkaNameGenerator({
  akaName,
  canGenerate,
  isLocked,
  onGenerate,
  onRegenerate,
  onLock,
  onUnlock,
}: AkaNameGeneratorProps) {
  return (
    <section className="profile-generator" aria-label="AKA name generator">
      <div className="profile-generator__title">
        <h3>Hockey AKA Generator</h3>
        <div className="profile-generator__title-meta">
          <span>Generated identity only</span>
          <span className="profile-generator__inline-hint" role="status" aria-live="polite">
            {isLocked
              ? "Identity locked. Unlock to edit traits or regenerate your AKA."
              : "Generate from selected traits, then lock it in."}
          </span>
        </div>
      </div>

      <label className="profile-form-field">
        <span>AKA Name</span>
        <input
          type="text"
          value={akaName ?? ""}
          className="faceoff-input profile-input profile-input--aka"
          placeholder="Generate your hockey AKA"
          readOnly
          aria-readonly="true"
        />
      </label>

      <div className="profile-generator__actions">
        <button type="button" className="faceoff-button-primary" onClick={onGenerate} disabled={!canGenerate || isLocked}>
          Generate AKA
        </button>
        <button type="button" className="faceoff-button-secondary" onClick={onRegenerate} disabled={!akaName || isLocked}>
          Regenerate
        </button>
        <button type="button" className="faceoff-button-primary" onClick={onLock} disabled={!akaName || isLocked}>
          Lock It In
        </button>
        <button type="button" className="faceoff-button-secondary" onClick={onUnlock} disabled={!isLocked}>
          Reset / Unlock
        </button>
      </div>

    </section>
  );
}
