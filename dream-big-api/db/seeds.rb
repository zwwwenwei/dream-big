require 'csv'

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

def seed_sequence_data(model, attributes, num)
    items = []
    for i in 1..num
        item = {}
        attributes.each do |attr|
            item[attr] = "#{attr}_#{i}"
        end
        items.append(item)
    end
    model.insert_all(items)

    puts "Seeded #{num} #{model} records"
end

import_from_csv(Rails.root.join('db','resources','users.csv'), User, ['name', 'username', 'password'])
import_from_csv(Rails.root.join('db','resources','categories.csv'), Category, ['name', 'description', 'weight'])
import_from_csv(Rails.root.join('db','resources','units.csv'), Unit, ['name', 'description', 'code'])

seed_sequence_data(User, ['name', 'username', 'password'], 30)


      