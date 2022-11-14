module Entities
    class JourneyEntity < Grape::Entity
      expose :id
      expose :student_id
      expose :assessment_id
      expose :timestamps
    end
  end