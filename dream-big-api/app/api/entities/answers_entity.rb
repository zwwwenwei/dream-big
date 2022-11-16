module Entities
  class AnswersEntity < Grape::Entity
    expose :id
    expose :answer
    expose :category_question_id
    expose :assessment_id
  end
end
