module Entities
    class PlansEntity < Grape::Entity
      expose :id
      expose :plan_text
      expose :section_id
      expose :goal_id
    end
end
