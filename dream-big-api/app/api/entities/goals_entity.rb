module Entities
    class GoalsEntity < Grape::Entity
      expose :id
      expose :description
      expose :status
      expose :section_id
    end
end
