require "test_helper"

class StarTest < ActiveSupport::TestCase
  test "cant create a star without a star system" do
    star = Star.new
    star.name = 'star1'
    assert_not star.save, "Saved star without a system"
  end

  test "can save a star with a system" do
    star = Star.new
    star.name = 'star1'
    star.star_system_id = star_systems(:admin).id
    assert star.save, "Couldn't Save star with a system"
  end
end
