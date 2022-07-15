module Entities
  class UnitEntity < Grape::Entity
    expose :id
    expose :code
    expose :name
    expose :description
  end
end
