"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import NumberFlow, { continuous } from "@number-flow/react";
import { gsap, useGSAP } from "@/lib/gsap";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SECTOR_RATES: Record<string, number> = {
  b2c: 0.084,
  "b2b-abonnement": 0.027,
  "services-entreprises": 0.057,
  "loisirs-sport-culture": 0.065,
  "artisanat-btp": 0.027,
  "hotellerie-restauration": 0.069,
  autre: 0.052,
};

const CA_VALUES: Record<string, number> = {
  "moins-10k": 9550,
  "11-50k": 30550,
  "51-100k": 75550,
  "101-150k": 125550,
  "151-200k": 175550,
  "plus-200k": 250550,
};

export default function CalculatorCore() {
  const [activitySector, setActivitySector] = useState("");
  const [churnFrequency, setChurnFrequency] = useState("mensuel");
  const [churnValue, setChurnValue] = useState("");
  const [lastRevenue, setLastRevenue] = useState("");
  const revealRef = useRef<HTMLDivElement | null>(null);
  const regagnerWrapRef = useRef<HTMLDivElement | null>(null);
  const hasRevealed = useRef(false);

  useGSAP(() => {
    gsap.set(revealRef.current, { height: 0, opacity: 0, overflow: "hidden" });
    gsap.set(regagnerWrapRef.current, { width: 0, overflow: "hidden" });
  });

  const isCase3 = churnValue.trim() === "?";

  const results = useMemo(() => {
    const case3 = churnValue.trim() === "?";

    if (!lastRevenue) return { res4: 0, res5: 0, res6: 0 };

    let taux: number;

    if (case3) {
      if (!activitySector || !SECTOR_RATES[activitySector])
        return { res4: 0, res5: 0, res6: 0 };
      taux = SECTOR_RATES[activitySector];
    } else {
      if (!churnValue || !churnFrequency) return { res4: 0, res5: 0, res6: 0 };
      const parsed = parseFloat(churnValue.replace(",", "."));
      if (isNaN(parsed) || parsed <= 0) return { res4: 0, res5: 0, res6: 0 };
      const taux_brut = parsed / 100;
      if (churnFrequency === "annuel") {
        taux = 1 - Math.pow(1 - taux_brut, 1 / 12);
      } else {
        taux = taux_brut;
      }
    }

    const CA = CA_VALUES[lastRevenue];
    if (!CA) return { res4: 0, res5: 0, res6: 0 };

    const res4 = Math.ceil(taux * CA * -1);
    const res5 = Math.ceil(res4 * -1 * 0.3);
    const res6 = Math.ceil(res5 * 12);

    return { res4, res5, res6 };
  }, [activitySector, churnFrequency, churnValue, lastRevenue]);

  useEffect(() => {
    if (results.res4 !== 0 && !hasRevealed.current) {
      hasRevealed.current = true;
      gsap.to(revealRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(regagnerWrapRef.current, {
        width: "auto",
        duration: 0.45,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [results.res4]);

  return (
    <div className="gap-space-2x flex h-full flex-col justify-between">
      <FieldSet>
        <FieldGroup className="gap-space-base">
          <Field className="gap-space-sm">
            <FieldContent className="flex h-full justify-center">
              <FieldLabel htmlFor="activity-sector">
                Secteur d'activité
              </FieldLabel>
            </FieldContent>
            <Select value={activitySector} onValueChange={setActivitySector}>
              <SelectTrigger id="activity-sector" className="w-full">
                <SelectValue placeholder="Choisir un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Secteur</SelectLabel>
                  <SelectItem value="b2c">
                    Commerce B2C (en ligne et/ou en magasin)
                  </SelectItem>
                  <SelectItem value="b2b-abonnement">
                    Commerce B2B ou modèles par abonnement
                  </SelectItem>
                  <SelectItem value="services-entreprises">
                    Service aux entreprises (conseil, formation…)
                  </SelectItem>
                  <SelectItem value="loisirs-sport-culture">
                    Loisirs, sport, culture
                  </SelectItem>
                  <SelectItem value="artisanat-btp">
                    Artisanat, BTP, maintenance
                  </SelectItem>
                  <SelectItem value="hotellerie-restauration">
                    Hôtellerie - restauration
                  </SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <div className="relative">
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground hover:text-foreground absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-colors">
                ?
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="flex max-w-[300px] flex-col items-start justify-start"
              >
                <p>
                  Le taux de churn, aussi dit taux d’attrition, correspond au
                  <strong>
                    {" "}
                    nombre de clients perdus sur une période donnée
                  </strong>
                </p>

                <ul className="list-disc">
                  <li>
                    Sélectionnez la période sur laquelle vous avez calculé votre
                    churn (selon si vous regardez mois par mois ou d’une année
                    sur l’autre), puis saisissez sa valeur.
                  </li>
                  <li>
                    Si vous ne connaissez pas votre taux de churn, saisissez un
                    “?”, nous utiliserons la valeur moyenne pour votre secteur.
                  </li>
                </ul>
              </TooltipContent>
            </Tooltip>
            <Field className="gap-space-base">
              <FieldContent className="h-full justify-center">
                <FieldLabel htmlFor="churn-rate">
                  Votre taux de churn
                </FieldLabel>
                <FieldDescription>
                  moyen en %, une seule décimale — ou "?" si inconnu
                </FieldDescription>
              </FieldContent>
              <div className="flex w-full gap-2">
                <Select
                  value={churnFrequency}
                  onValueChange={setChurnFrequency}
                  disabled={isCase3}
                >
                  <SelectTrigger id="churn-rate" className="h-full w-full">
                    <SelectValue placeholder="Fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fréquence</SelectLabel>
                      <SelectItem value="mensuel">Mensuel</SelectItem>
                      <SelectItem value="annuel">Annuel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder='Ex: 6,4 ou "?"'
                  value={churnValue}
                  onChange={(event) => {
                    const raw = event.target.value;
                    if (raw === "?") {
                      setChurnValue("?");
                      return;
                    }
                    const normalizedValue = raw
                      .replace(/\./g, ",")
                      .replace(/[^0-9,]/g, "");
                    const [integerPart, ...decimalParts] =
                      normalizedValue.split(",");
                    const next =
                      decimalParts.length > 0
                        ? `${integerPart},${decimalParts.join("")}`
                        : integerPart;
                    setChurnValue(next);
                  }}
                  className="w-full"
                />
              </div>
            </Field>
          </div>

          <Field className="gap-space-sm">
            <FieldContent className="flex h-full justify-center">
              <FieldLabel htmlFor="last-revenue">
                Votre CA du mois dernier
              </FieldLabel>
              <FieldDescription>
                fourchette, CA mensuel HT en €
              </FieldDescription>
            </FieldContent>
            <Select value={lastRevenue} onValueChange={setLastRevenue}>
              <SelectTrigger id="last-revenue" className="w-full">
                <SelectValue placeholder="Sélectionnez votre CA (HT)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="moins-10k">
                    Moins de 10 000€ / mois
                  </SelectItem>
                  <SelectItem value="11-50k">
                    Entre 11 et 50 000€ / mois
                  </SelectItem>
                  <SelectItem value="51-100k">
                    Entre 51 et 100 000€ / mois
                  </SelectItem>
                  <SelectItem value="101-150k">
                    Entre 101 et 150 000€ / mois
                  </SelectItem>
                  <SelectItem value="151-200k">
                    Entre 151 et 200 000€ / mois
                  </SelectItem>
                  <SelectItem value="plus-200k">
                    Plus de 200 000€ / mois
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <div className="gap-space-sm pt-space-base flex flex-col justify-end">
          <div className="gap-space-base pr-space-base flex items-center justify-between">
            <p className="text-secondary text-sm">
              Ce que ça vous a coûté le mois dernier :
            </p>
            <NumberFlow
              value={Math.abs(results.res4)}
              plugins={[continuous]}
              trend={-1}
              prefix="-"
              locales="fr-FR"
              format={{
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }}
              className="font-head text-2xl text-red-500"
            />
          </div>
          <div
            ref={revealRef}
            id="reveal-results"
            className="p-space-base gap-space-sm bg-indigo/5 flex flex-col rounded-xl"
          >
            <div className="gap-space-base flex items-center justify-between">
              <p className="text-secondary text-sm">
                Le CA gagné chaque mois si on travaille ensemble :
              </p>
              <NumberFlow
                value={results.res5}
                plugins={[continuous]}
                trend={1}
                locales="fr-FR"
                format={{
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }}
                className="font-head text-indigo text-2xl"
              />
            </div>
            <div className="gap-space-base flex items-center justify-between">
              <p className="text-secondary text-sm">Soit un gain annuel de :</p>
              <NumberFlow
                value={results.res6}
                plugins={[continuous]}
                trend={1}
                locales="fr-FR"
                format={{
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }}
                className="font-head text-indigo text-2xl"
              />
            </div>
            <div className="flex justify-end">
              <div ref={regagnerWrapRef}>
                <Button
                  type="button"
                  className="w-fit cursor-pointer rounded-full p-3 px-4 text-sm hover:opacity-80 active:scale-[0.98]"
                >
                  Regagner mon CA perdu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FieldSet>
      {results.res4 === 0 && (
        <p className="text-muted-foreground text-center text-xs">
          Remplissez tous les champs pour lancer le calcul.
        </p>
      )}
    </div>
  );
}
