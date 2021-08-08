import {CardDefinitionList} from "./card_creation";

export const cardDefinitionsV1: CardDefinitionList = {
    'strike': {
        cost: 1,
        effects: [{kind: 'damage', amount: 7}]
    },
    'armor': {
        cost: 1,
        effects: [{kind: 'defense', amount: 4}]
    },
    'incapacitate': {
        cost: 2,
        effects: [
            {kind: 'damage', amount: 10},
            {kind: 'defense', amount: 4},
        ]
    }
}
