module Entities
    class PlanetsEntity < Grape::Entity
      expose :id
      expose :status
    end
  end