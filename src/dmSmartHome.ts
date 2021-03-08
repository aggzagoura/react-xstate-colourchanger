import { MachineConfig, send, Action, assign } from "xstate";

// SRGS parser and example (logs the results to console on page load)
import { loadGrammar } from './runparser'
import { parse } from './chartparser'
import { grammar } from './grammars/grammar_Angeliki'

const gram = loadGrammar(grammar)
const input = "open the door"
const prs = parse(input.split(/\s+/), gram)
const result = prs.resultsForRule(gram.$root)[0]
console.log(result)

function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

function parsing(text:string): MachineConfig<SDSContext, any, SDSEvent> {
    return (parse(text.split(/\s+/), gram).resultsForRule(gram.$root)[0])
}



export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    cond: (context) => parsing(context.recResult) !== undefined,
                    target: "final",
                    actions: assign((context) => { return { option: parsing(context.recResult) } }),
                },
                {target: ".nomatch" }]    
            },
           states: {
            prompt: {
            entry: say("What would you like?"),
            on: { ENDSPEECH: 'ask' }
        },
        ask: {
            entry: listen(),
        },
        nomatch: {entry: say("Could you repeat"),
            on: { ENDSPEECH: 'prompt' }
        }}
        },
        final: {
            initial: "prompt",
            on: { ENDSPEECH: "init" },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. the thing I want is ${context.option.combination.object} and the move is ${context.option.combination.move}.`
                    }))
                },
            }
        },
        
    }
})
