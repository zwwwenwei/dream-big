module Entities
    class JourneyStarEntity < Grape::Entity
      expose :id
      expose :student_journey_id
      expose :isMaxed
    end
  end