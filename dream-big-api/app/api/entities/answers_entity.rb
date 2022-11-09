module Entities
    class AnswersEntity < Grape::Entity
      expose :id
      expose :answer
      expose :questionID
      expose :assessmentID
    end
  end