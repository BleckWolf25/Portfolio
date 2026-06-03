/**
 * @file softSkills.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Static soft-skills data for the portfolio.
 *
 * @description
 * Static soft-skills data for the portfolio. Each entry follows the STAR
 * (Situation, Task, Action, Result) behavioural interview framework.
 * All text fields are stored as i18n keys so they can be localised without
 * modifying this module.
 *
 * @since 12/05/2026
 * @updated 27/05/2026
 */
// ---------- INTERFACES
/**
 * A concrete STAR example that illustrates a soft skill in practice.
 * Every field is an i18n key; the rendered text is resolved by the component.
 *
 * Convention: `softSkillsList.<id>.<field>` (e.g. `softSkillsList.communication.situation`)
 */
export interface StarExample {
  /** i18n key for the Situation - what was the context? */
  situationKey: string

  /** i18n key for the Task - what was the goal or challenge? */
  taskKey: string

  /** i18n key for the Action - what steps were taken? */
  actionKey: string

  /** i18n key for the Result - what was the measurable outcome? */
  resultKey: string
}

/**
 * A soft skill with a display name, an icon, and a concrete STAR example.
 */
export interface SoftSkill {
  /** Stable identifier used as a Vue `:key`. */
  id: string

  /** Human-readable skill name (not localised - used as a heading). */
  name: string

  /** @nuxt/icon component name (e.g. `'i-heroicons-chat-bubble-left-right'`). */
  icon: string

  /** STAR-format example that demonstrates this skill in a real context. */
  star: StarExample
}

// ---------- DATA
/**
 * Ordered list of soft skills displayed in the Soft Skills section.
 * Add new entries here; cards are rendered in the order defined.
 */
export const softSkills: SoftSkill[] = [
  {
    id: 'communication',
    name: 'Communication',
    icon: 'i-heroicons-chat-bubble-left-right',
    star: {
      situationKey: 'softSkillsList.communication.situation',
      taskKey: 'softSkillsList.communication.task',
      actionKey: 'softSkillsList.communication.action',
      resultKey: 'softSkillsList.communication.result',
    },
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    icon: 'i-heroicons-light-bulb',
    star: {
      situationKey: 'softSkillsList.problem-solving.situation',
      taskKey: 'softSkillsList.problem-solving.task',
      actionKey: 'softSkillsList.problem-solving.action',
      resultKey: 'softSkillsList.problem-solving.result',
    },
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    icon: 'i-heroicons-user-group',
    star: {
      situationKey: 'softSkillsList.teamwork.situation',
      taskKey: 'softSkillsList.teamwork.task',
      actionKey: 'softSkillsList.teamwork.action',
      resultKey: 'softSkillsList.teamwork.result',
    },
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    icon: 'i-heroicons-arrow-path',
    star: {
      situationKey: 'softSkillsList.adaptability.situation',
      taskKey: 'softSkillsList.adaptability.task',
      actionKey: 'softSkillsList.adaptability.action',
      resultKey: 'softSkillsList.adaptability.result',
    },
  },
  {
    id: 'creative-thinking',
    name: 'Creative Thinking',
    icon: 'i-heroicons-sparkles',
    star: {
      situationKey: 'softSkillsList.creative-thinking.situation',
      taskKey: 'softSkillsList.creative-thinking.task',
      actionKey: 'softSkillsList.creative-thinking.action',
      resultKey: 'softSkillsList.creative-thinking.result',
    },
  },
]
