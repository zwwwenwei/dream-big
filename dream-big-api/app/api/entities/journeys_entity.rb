module Entities
    class JourneyEntity < Grape::Entity
      expose :id
      expose :studentID
      expose :assessmentID
      expose :timestamps
    end
  end