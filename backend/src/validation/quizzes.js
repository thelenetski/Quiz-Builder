import Joi from 'joi';

const questionSchema = Joi.object({
  id: Joi.string().uuid().required(),
  type: Joi.string().valid('boolean', 'input', 'checkbox').required(),
  text: Joi.string().min(1).required(),

  options: Joi.when('type', {
    is: 'checkbox',
    then: Joi.array().items(Joi.string().min(1)).min(2).required(),
    otherwise: Joi.forbidden(),
  }),

  correctAnswer: Joi.when('type', {
    is: Joi.valid('boolean', 'input'),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),

  correctAnswers: Joi.when('type', {
    is: 'checkbox',
    then: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .custom((value, helpers) => {
        const options = helpers.state.ancestors[0].options || [];
        const allValid = value.every((v) => options.includes(v));
        if (!allValid) {
          return helpers.error('invalid');
        }
        return value;
      })
      .messages({
        invalid: 'Все correctAnswers должны присутствовать в options',
      }),
    otherwise: Joi.forbidden(),
  }),
});

export const createQuizSchema = Joi.object({
  title: Joi.string().min(1).required(),
  questions: Joi.array().items(questionSchema).min(1).required(),
});
