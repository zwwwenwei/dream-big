module Entities
    class AssessmentEntity < Grape::Entity
      expose :id
      expose :journey_id
      expose :category_id
      expose :timestamps
    end
  end