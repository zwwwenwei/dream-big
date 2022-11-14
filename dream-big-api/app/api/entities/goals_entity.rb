module Entities
    class GoalsEntity < Grape::Entity
      expose :id
      expose :goal_text
      expose :status
      expose :timestamps
    end
  end