module Entities
    class CategoryQuestionsEntity < Grape::Entity
      expose :id
      expose :question
      expose :categoryID
      expose :timestamps
    end
  end