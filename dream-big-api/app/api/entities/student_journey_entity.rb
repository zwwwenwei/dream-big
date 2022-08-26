module Entities
    class StudentJourneyEntity < Grape::Entity
      expose :id
      expose :timeline
      expose :student_id
      expose :student
    end
  end