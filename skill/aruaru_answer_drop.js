'use strict';

module.exports = class AruaruAnswerDrop {
  async begin(bot, event, context){
    await bot.queue({
      type: "text",
      text: "なぜ、机の上のものを落とすか、それは楽しいからです。落とすものによって、その様子は様々、ネコは獲物を想起させるものが好きなので、落下の動きが楽しいのです。また、モノを落とすと飼い主さんが来たり、声を出したりするので、その反応も楽しんでいます。"
    });
  }

  constructor() {
    this.clear_context_on_finish = true;
    this.required_parameter = {
      another_q: {
        message_to_confirm: {
          type: "template",
          altText: "他にも気になることある？",
          template: {
            type: "buttons",
            text: "他にも気になることある？",
            actions: [
              {
                type: "postback",
                label: "対処法ある？",
                displayText: "対処法ある？",
                data: "aruaru_answer_copedrop"
              }
            ]
          }
        },
        parser: async (value, bot, event, context) => {
          if (["aruaru_answer_copedrop"].includes(value.data)){
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
    let intent_name = context.confirmed.another_q.data;
    await bot.switch_skill({
      name: intent_name
    });
  }
};
