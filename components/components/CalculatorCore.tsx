"use client";

import { useState } from "react";
import NumberFlow, { continuous } from "@number-flow/react";

import { Button } from "@/components/ui/button";
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

export default function CalculatorCore() {
  const [churnValue, setChurnValue] = useState("");
  const [calculatedValue, setCalculatedValue] = useState(0);

  return (
    <div className="flex h-full flex-col justify-between gap-[6vh]">
      <FieldSet>
        <FieldGroup className="gap-space-base">
          <Field className="gap-space-sm flex flex-col md:grid grid-cols-[minmax(0,1fr)_minmax(0,16rem)] items-start">
            <FieldContent className="flex h-full justify-center">
              <FieldLabel htmlFor="activity-sector">
                Secteur d'activite
              </FieldLabel>
            </FieldContent>
            <Select>
              <SelectTrigger id="activity-sector" className="w-full">
                <SelectValue placeholder="Choisir un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Secteur</SelectLabel>
                  <SelectItem value="apple">Conseil aux entreprises</SelectItem>
                  <SelectItem value="banana">
                    Industrie manufacturière
                  </SelectItem>
                  <SelectItem value="blueberry">
                    Commerce physique / PGC
                  </SelectItem>
                  <SelectItem value="grapes">E-commerce / retail</SelectItem>
                  <SelectItem value="pineapple">Commerce de gros </SelectItem>
                  <SelectItem value="pineapple">Autres</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field className="flex flex-col md:grid grid-cols-[minmax(0,1fr)_minmax(0,16rem)] items-start gap-space-sm">
            <FieldContent className="h-full justify-center">
              <FieldLabel htmlFor="churn-rate">Votre taux de churn</FieldLabel>
              {/* <FieldDescription className="text-xs">
                moyen en %, une seule décimale
              </FieldDescription> */}
            </FieldContent>
            <div className="flex w-full gap-2">
              <Select>
                <SelectTrigger id="churn-rate" className="h-full w-full">
                  <SelectValue placeholder="Choisir un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fréquence</SelectLabel>
                    <SelectItem value="apple">Mensuel</SelectItem>
                    <SelectItem value="banana">Annuel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Ex: 6,4"
                value={churnValue}
                onChange={(event) => {
                  const normalizedValue = event.target.value
                    .replace(/\./g, ",")
                    .replace(/[^0-9,]/g, "");
                  const [integerPart, ...decimalParts] =
                    normalizedValue.split(",");

                  setChurnValue(
                    decimalParts.length > 0
                      ? `${integerPart},${decimalParts.join("")}`
                      : integerPart,
                  );
                }}
                className="w-full"
              />
            </div>
          </Field>

          <Field className="flex flex-col md:grid grid-cols-[minmax(0,1fr)_minmax(0,16rem)] items-start gap-space-sm">
            <FieldContent className="flex h-full justify-center">
              <FieldLabel htmlFor="last-revenue">
                Votre CA du mois dernier
              </FieldLabel>
            </FieldContent>
            <Select>
              <SelectTrigger id="last-revenue" className="w-full">
                <SelectValue placeholder="Sélectionnez votre CA (HT)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">{"< 10 000€ / mois"}</SelectItem>
                  <SelectItem value="banana">
                    {"11 - 50 000€ / mois"}
                  </SelectItem>
                  <SelectItem value="blueberry">
                    {"51 - 100 000€ / mois"}
                  </SelectItem>
                  <SelectItem value="pineapple">
                    {"> 100 000€ / mois"}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <div className="flex flex-col gap-2 pt-[6vh]">
          <div className="gap-space-base flex items-center justify-between">
            <p className="text-secondary text-sm">
              Ce que ca vous coute le moise dernier :
            </p>
            <NumberFlow
              value={calculatedValue}
              plugins={[continuous]}
              trend={1}
              prefix="-"
              locales="fr-FR"
              format={{
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }}
              className="font-head text-2xl"
            />
          </div>
          <div className="gap-space-base flex items-center justify-between">
            <p className="text-secondary text-sm">
              Le CA gagné chaque mois si on travaille ensemble
            </p>
            <NumberFlow
              value={calculatedValue}
              plugins={[continuous]}
              trend={1}
              locales="fr-FR"
              format={{
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }}
              className="font-head text-2xl"
            />
          </div>
        </div>
      </FieldSet>
      <Button
        type="button"
        className="w-fit self-end rounded-full p-3 px-4 text-sm hover:cursor-pointer"
        onClick={() => {
          const parsedValue = Number.parseFloat(churnValue.replace(",", "."));

          setCalculatedValue(
            Number.isNaN(parsedValue) ? 0 : parsedValue * 10000,
          );
        }}
      >
        Calculer mon CA perdu
      </Button>
    </div>
  );
}
