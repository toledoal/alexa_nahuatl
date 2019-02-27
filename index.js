// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const SKILL_NAME = 'Guía de palabras mexicanas';
const GET_FACT_MESSAGE = 'Una palabra usada en México con origen náhuatl ';
const HELP_MESSAGE = 'Puedes decir: Dime una palabra... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?';
const HELP_REPROMPT = '¿Cómo te puedo ayudar?';
const STOP_MESSAGE = 'Adios y <say-as interpret-as="interjection">buena suerte</say-as>';

const data = [
  //Lista de Palabras... 
`La palabra tlapalería o ferretería tiene su origen en el náhuatl "color", por eso es común que en las tlapalerias vendan pintura`,
`El "coyote", es un animal que habita en gran parte de Estados Unidos, su nombre proviene de la palabra náhuatl "coyotl"`,
`El "esquite", viene de la palabra náhuatl "izquitl", que significa botana de maíz`,
`"Apapachar", viene de la palabra “apapachoa”, que significa ablandar algo con los dedos. Actualmente, esta palabra significa dar cariño`,
`Comal, viene de “comalli”, se refiere al objeto donde se cuecen las tortillas de maíz.`,
`La palabra cuate, proviene de “cuatl”, significa hermano gemelo y que comúnmente usamos para referirnos a un amigo.`,
`Jicara, viene “xicalli”, significa vaso elaborado a partir de una calabaza. `,
`Guey podría originarse del náhuatl  “huey”, que significa venerado, honorable, y que los españoles equipararon con “buey” o bovino.`,
`Popote, tiene su origen en la palabra “popotli”, se refiere al tallo seco y hueco de las gramíneas, que crecían con abundancia alrededor de la Gran Tenochtitlán.`,
`Tianguis, tiene su origen en el náhuatl “tiyanquiztli”, que significa mercado.`,
`Tomate o jitomate, viene de la palabra “tomatl”, y significa agua gorda.`,
`Papalote, del náhuatl “papalotl”, que significa mariposa.`,
`El itacalte, viene del náhuatl “itacatl”, se refiere a una bolsa que contiene algo de alimento para un viaje o para llevar a casa.`,
`Elote, tiene su origen en el náhuatl “elotl”, que significa mazorca tierna de maíz.`,
`Guacamole, tiene su origen en el náhuatl “ahuacamolli”, formado por “ahuacatl” (aguacate), y “mulli” (salsa).`,
`Chicle, proviene del náhuatl “tzictli”, que es la goma de mascar que emana del árbol de chico zapote.`,
`Cacle o chancla, es una palabra que viene del nahuatl cactli “zapato”, “sandalia”.`,
`Chocolate, proviene del náhuatl xocolatl, que está formado por las palabras xoco, amargo y atl que significa agua.`,

];

const DatoPalabraHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name === 'DatoCuriosoIntent';
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hola! muchas palabras comunes en México tienen su origen en la lengua náhuatl. Te digo una palabra?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Me puedes pedir una palabra! Te digo una palabra?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Adios!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `Has lanzado el intento ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Lo siento, no entiendo lo que dices. Puedes intentarlo de nuevo, preguntame por una palabra.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DatoPalabraHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
