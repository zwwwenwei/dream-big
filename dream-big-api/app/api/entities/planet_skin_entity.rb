module Entities
    class PlanetSkinEntity < Grape::Entity
      expose :id
      expose :asset
      expose :color
    end
  end