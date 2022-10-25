require "test_helper"

class StarSystemTest < ActiveSupport::TestCase
  test "cant create a system without a journey" do
    star_sys = StarSystem.new
    star_sys.name = 'test star system'
    assert_not star_sys.save, "Saved system without a journey"
  end

  test "can save a system with a journey" do
    star_sys = StarSystem.new
    star_sys.name = 'test star system'
    star_sys.student_journey_id = student_journeys(:admin).id
    assert star_sys.save, "Couldn't save system with a journey"
  end

  test "star system fixture exists" do
    assert_equal "admin-system", star_systems(:admin).name
    assert_equal student_journeys(:admin).id, star_systems(:admin).student_journey_id
  end
  # test "star systems have planets" do
end
