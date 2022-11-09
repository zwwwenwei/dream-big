module Entities
    class GoalsEntity < Grape::Entity
      expose :id
      expose :goalText
      expose :status
      expose :timestamps
    end
  end