"use strict";

module.exports = class FoodSelect {

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      question: {
        message_to_confirm: {
          type: "template",
          altText: "ご飯が気になるんだね、ご飯のどういったところが気になっているのかな？",
          template: {
            type: "buttons",
            text: "ご飯が気になるんだね、ご飯のどういったところが気になっているのかな？",
            actions: [{
                type: "postback",
                label: "ご飯の基本",
                displayText: "ご飯の基本",
                data: "food_select_basic"
              },
              {
                type: "postback",
                label: "あげちゃいけないもの",
                displayText: "あげちゃいけないもの",
                data: "food_select_donteat"
              },
              {
                type: "postback",
                label: "水のあげ方は？",
                displayText: "水のあげ方は？",
                // data: "food_quiz_noteat"
                data: "food_select_water"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["food_select_water", "food_select_donteat", "food_select_basic"].includes(value.data)){
            return value;
          }
          throw new Error();
        },
        reaction: async (error, value, bot, event, context) => {
          if (error){
            await bot.reply({
              type: "text",
              text: "にゃ？\nもう一度言ってほしいにゃ。"
            });
            await bot.init();
          }
        }
      }
    }
  }

  async finish(bot, event, context) {
    let intent_name = context.confirmed.question.data;
    console.log("*******ToiletWhyMulti*******intent_name ********: "+intent_name);
    await bot.switch_skill({
      name: intent_name
    });
  }
};
