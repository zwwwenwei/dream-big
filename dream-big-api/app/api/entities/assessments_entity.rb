module Entities
    class AssessmentEntity < Grape::Entity
      expose :id
      expose :journeyID
      expose :categoryID
      expose :timestamps
    end
  end