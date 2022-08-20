module Entities
    class StarSkinEntity < Grape::Entity
      expose :id
      expose :asset
      expose :color
    end
  end