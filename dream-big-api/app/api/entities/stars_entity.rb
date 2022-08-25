module Entities
  class StarsEntity < Grape::Entity
    expose :id
    expose :status
    expose :name
    expose :star_system_id
  end
end
