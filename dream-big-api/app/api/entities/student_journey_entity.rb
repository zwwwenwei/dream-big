module Entities
    class StudentJourneyEntity < Grape::Entity
      expose :id
      expose :timeline
    end
  end