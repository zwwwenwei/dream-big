module Entities
    class AnswersEntity < Grape::Entity
      expose :id
      expose :answer_text
      expose :question_id
      expose :assessment_id
    end
  end