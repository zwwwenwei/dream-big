require "csv"
require "faker"
I18n.reload!

# The data can be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

def import_from_csv(path, model, attributes)
  items = []
  CSV.foreach(path, headers: true).map do |row|
    item = {}
    attributes.each do |attr|
      item[attr] = row[attr]
    end
    items.append(item)
  end
  model.insert_all(items)
end

def seed_data_parent_child(parent_model, parent_attributes, child_model, child_attributes, num)
  parent_items = []
  child_items = []
  for i in 1..num
    parent_item = {}
    parent_attributes.each do |attr, val|
      parent_item[attr] = "#{val.call()}"
    end

    parent_item = parent_model.create(parent_item)
    parent_item.save!

    child_item = {}
    child_item["#{parent_model}_id".downcase] = parent_item.id
    child_attributes.each do |attr, val|
      child_item[attr] = "#{val.call()}"
    end
    child_item = child_model.create(child_item)
  end

  puts "Seeded #{num} #{parent_model} and #{child_model} records"
end

def seed_child_data(parent_items, child_model, child_attributes, num_per_parent=1)
  items = []
  parent_items.each do |parent_item|
    for i in 1..num_per_parent
      child_item = {}
      parent_name = parent_item.class.name.scan(/[A-Z][a-z]+/).join("_")
      child_item["#{parent_name}_id".downcase] = parent_item.id
      child_attributes.each do |attr|
        child_item[attr] = "#{parent_item.id}"
      end
      child_item = child_model.create(child_item)
      child_item.save!
      items.append(child_item)
    end
  end

  puts "Seeded #{parent_items.length()} #{child_model} records" 
  return items
end

def seed_sequence_data(model, attributes, num)
  items = []
  last_id = model.last ? model.last.id : 0
  for i in last_id+1..num+last_id
    item = {}
    attributes.each do |attr|
      item[attr] = "#{attr}_#{i}"
    end
    item = model.create(item)
    item.save!
    items.append(item)
  end
  puts "Seeded #{num} #{model} records"
  return items
end

def create_admin_user_student()
  admin = User.find_or_initialize_by(email: 'admin')
  admin.password = 'admin'
  admin.username = 'admin'
  admin.save!

  admin_s = Student.find_or_initialize_by(user_id: admin.id)
  admin_s.firstName = 'admin'
  admin_s.save!

  puts "Created user\nemail: admin\npassword: admin"
  return admin_s

end

def faker_first_name()
  return Faker::Name.first_name
end

def faker_name()
  return Faker::Name.name
end

def faker_phone()
  return Faker::PhoneNumber.extension
end

# import_from_csv(Rails.root.join('db','resources','users.csv'), User, ['name', 'username', 'password'])
# import_from_csv(Rails.root.join('db','resources','categories.csv'), Category, ['name', 'description', 'weight'])
# import_from_csv(Rails.root.join('db','resources','units.csv'), Unit, ['name', 'description', 'code'])


# user_data = {
#   'name': method(:faker_first_name),
#   'email': method(:faker_email)
#   'username': method(:faker_name),
#   'password': method(:faker_name),
# }
# student_data = {
#   'name': method(:faker_name),
#   'phone': method(:faker_phone),
#   'address': method(:faker_name),
# }

# seed_data_parent_child(User, user_data, Student, student_data, 5)


admin_student = create_admin_user_student()
# users = seed_sequence_data(User, ['username','email', 'password'], 5)

student_journey = seed_child_data([admin_student], StudentJourney, ['timeline'])

star_system_1 = seed_child_data(student_journey, StarSystem, ['status', 'name'])
seed_child_data(star_system_1, Star, ['name', 'status'])
seed_child_data(star_system_1, Planet, ['status', 'name'], 5)

star_system_2 = seed_child_data(student_journey, StarSystem, ['status', 'name'])
seed_child_data(star_system_2, Star, ['name', 'status'])
seed_child_data(star_system_2, Planet, ['status', 'name'], 6)

star_system_3 = seed_child_data(student_journey, StarSystem, ['status', 'name'])
seed_child_data(star_system_3, Star, ['name', 'status'])
seed_child_data(star_system_3, Planet, ['status', 'name'], 4)

# seed_sequence_data(Category, ['name', 'description', 'weight'], 5)