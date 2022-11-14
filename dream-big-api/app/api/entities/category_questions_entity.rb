module Entities
    class CategoryQuestionsEntity < Grape::Entity
      expose :id
      expose :question
      expose :category_id
      expose :timestamps
    end
  end