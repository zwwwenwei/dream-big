require "test_helper"

class PlanetTest < ActiveSupport::TestCase
  test "cant create a planet without a star system" do
    planet = Planet.new
    planet.name = 'planet1'
    assert_not planet.save, "Saved planet without a system"
  end

  test "can save a planet with a system" do
    planet = Planet.new
    planet.name = 'planet1'
    planet.star_system_id = star_systems(:admin).id
    assert planet.save, "Couldn't Save planet with a system"
  end
end
