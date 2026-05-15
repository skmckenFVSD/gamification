import React, { useMemo } from "react";
import type { HockeyTrait } from "../../data/hockeyTraits";

type TraitPillSelectorProps = {
  traits: HockeyTrait[];
  selectedTraitIds: string[];
  maxTraits: number;
  locked?: boolean;
  onToggleTrait: (traitId: string) => void;
};

export default function TraitPillSelector({
  traits,
  selectedTraitIds,
  maxTraits,
  locked = false,
  onToggleTrait,
}: TraitPillSelectorProps) {
  const selectedCount = selectedTraitIds.length;
  const atLimit = selectedCount >= maxTraits;

  const selectedSet = useMemo(() => new Set(selectedTraitIds), [selectedTraitIds]);

  return (
    <section className="profile-traits" aria-label="Player traits">
      <div className="profile-traits__header">
        <h3>Player Traits</h3>
        <div className="profile-traits__meta">
          <span className="profile-traits__count">{selectedCount} / {maxTraits} selected</span>
          <span className="profile-traits__inline-hint" role="status" aria-live="polite">
            {locked
              ? "Traits are locked."
              : atLimit
              ? `Max ${maxTraits} reached.`
              : "Select up to 5 traits."}
          </span>
        </div>
      </div>

      <div className="profile-traits__grid">
        {traits.map((trait) => {
          const isSelected = selectedSet.has(trait.id);
          const shouldDisable = locked || (!isSelected && atLimit);

          return (
            <button
              key={trait.id}
              type="button"
              className={`profile-trait-pill ${isSelected ? "is-selected" : ""}`}
              onClick={() => onToggleTrait(trait.id)}
              disabled={shouldDisable}
              aria-pressed={isSelected}
              aria-label={`Trait ${trait.label}`}
            >
              <span>{trait.label}</span>
            </button>
          );
        })}
      </div>

    </section>
  );
}
