module Entities
    class ReflectionsEntity < Grape::Entity
      expose :id
      expose :reflection_text
      expose :section_id
      expose :goal_id
    end
end
