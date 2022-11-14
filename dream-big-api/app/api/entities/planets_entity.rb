module Entities
    class PlanetsEntity < Grape::Entity
      expose :id
      expose :name
      expose :journey_id
    end
  end