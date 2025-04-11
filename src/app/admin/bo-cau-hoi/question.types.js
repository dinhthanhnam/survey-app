/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} question_name
 * @property {string} question_text
 * @property {string} [question_note]
 * @property {'group' | 'radiogroup' | 'checkbox'} question_type
 * @property {string[]} question_target
 * @property {number | null} parent_id
 * @property {number} belongs_to_pillar
 * @property {number} weighted_percentage
 * @property {QuestionOption[]} question_options
 */

/**
 * @typedef {Object} QuestionOption
 * @property {number} id
 * @property {number | null} question_id
 * @property {string} option_text
 * @property {number} option_value
 * @property {number} require_reason
 * @property {string | null} [option_note]
 * @property {number | null} weighted_value
 */