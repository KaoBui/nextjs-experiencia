"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FormCore() {
  return (
    <form className="w-full">
      <FieldSet>
        <FieldGroup className="gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <Input id="firstName" name="firstName" placeholder="Prenom" />
            </Field>
            <Field>
              <Input id="lastName" name="lastName" placeholder="Nom" />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                placeholder="Telephone"
              />
            </Field>
            <Field>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Nom de l'entreprise"
              />
            </Field>
          </div>

          <Field>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Adresse email"
            />
          </Field>

          <Field>
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              className="min-h-32"
            />
          </Field>

          <Button type="submit" className="w-full md:w-fit">
            Envoyer
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
