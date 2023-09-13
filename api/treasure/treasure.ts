import { TreasureAttribute } from "./treasure-attribute";

export class Treasure {
  readonly name: string;
  readonly description: string;
  readonly value: number;

  private attributes: TreasureAttribute[];

  constructor(name: string, description: string, value: number) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.attributes = [];
  }

  addAttribute(attribute: TreasureAttribute) {
    this.attributes.push(attribute);
  }

  getAttributes(): TreasureAttribute[] {
    return this.attributes;
  }
}
