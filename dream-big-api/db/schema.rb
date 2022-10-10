# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_10_003518) do
  create_table "avatar_accessories", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
  end

  create_table "avatar_hairs", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
  end

  create_table "avatar_heads", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
  end

  create_table "avatar_torsos", charset: "utf8mb4", force: :cascade do |t|
    t.string "color"
    t.string "shape"
    t.string "texture"
  end

  create_table "avatars", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "avatar_head_id"
    t.bigint "avatar_torsos_id"
    t.bigint "avatar_haris_id"
    t.bigint "avatar_accessories_id"
    t.index ["avatar_accessories_id"], name: "fk_rails_b7154260fe"
    t.index ["avatar_haris_id"], name: "fk_rails_f4ac0ee8ab"
    t.index ["avatar_head_id"], name: "fk_rails_a8fde6201d"
    t.index ["avatar_torsos_id"], name: "fk_rails_12f7f2f036"
  end

  create_table "categories", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "weight_values_id"
    t.index ["weight_values_id"], name: "fk_rails_1576e280c4"
  end

  create_table "course_units", charset: "utf8mb4", force: :cascade do |t|
  end

  create_table "course_versions", charset: "utf8mb4", force: :cascade do |t|
    t.date "startdate"
    t.date "enddate"
    t.date "datecensus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "courseDesc"
  end

  create_table "journey_Stars", charset: "utf8mb4", force: :cascade do |t|
    t.boolean "isMaxed"
    t.bigint "student_journey_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_journey_id"], name: "fk_rails_cd42b145a0"
  end

  create_table "planet_skins", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.string "asset"
  end

  create_table "planets", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.bigint "star_system_id"
    t.bigint "skin_id"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "fk_rails_54163c97c0"
    t.index ["skin_id"], name: "fk_rails_a26b5012c8"
    t.index ["star_system_id"], name: "fk_rails_301d41c9cb"
  end

  create_table "roles", charset: "utf8mb4", force: :cascade do |t|
    t.string "role_description"
  end

  create_table "star_skins", charset: "utf8mb4", force: :cascade do |t|
    t.string "colour"
    t.string "asset"
  end

  create_table "star_systems", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.boolean "status"
    t.bigint "student_journey_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_journey_id"], name: "fk_rails_b3ad9a271c"
  end

  create_table "stars", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "goals"
    t.string "reflection"
    t.boolean "status"
    t.bigint "star_system_id"
    t.bigint "skin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skin_id"], name: "fk_rails_03e4effcfa"
    t.index ["star_system_id"], name: "fk_rails_23decec5d5"
  end

  create_table "student_courses", charset: "utf8mb4", force: :cascade do |t|
  end

  create_table "student_journeys", charset: "utf8mb4", force: :cascade do |t|
    t.float "timeline"
    t.bigint "student_id"
    t.bigint "journey_stars_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["journey_stars_id"], name: "fk_rails_36daf1c6f2"
    t.index ["student_id"], name: "fk_rails_cc2571c819"
  end

  create_table "students", charset: "utf8mb4", force: :cascade do |t|
    t.string "firstName"
    t.string "lastName"
    t.integer "phone"
    t.string "address"
    t.string "student_type"
    t.bigint "user_id"
    t.bigint "avatar_id"
    t.index ["avatar_id"], name: "fk_rails_66f8a533c3"
    t.index ["user_id"], name: "fk_rails_148c9e88f4"
  end

  create_table "units", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "description", limit: 4096
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.bigint "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "fk_rails_642f17018b"
  end

  create_table "weight_values", charset: "utf8mb4", force: :cascade do |t|
    t.integer "weight"
  end

  add_foreign_key "avatars", "avatar_accessories", column: "avatar_accessories_id"
  add_foreign_key "avatars", "avatar_hairs", column: "avatar_haris_id"
  add_foreign_key "avatars", "avatar_heads"
  add_foreign_key "avatars", "avatar_torsos", column: "avatar_torsos_id"
  add_foreign_key "categories", "weight_values", column: "weight_values_id"
  add_foreign_key "journey_Stars", "student_journeys", on_delete: :cascade
  add_foreign_key "planets", "categories"
  add_foreign_key "planets", "planet_skins", column: "skin_id"
  add_foreign_key "planets", "star_systems", on_delete: :cascade
  add_foreign_key "star_systems", "student_journeys", on_delete: :cascade
  add_foreign_key "stars", "star_skins", column: "skin_id"
  add_foreign_key "stars", "star_systems", on_delete: :cascade
  add_foreign_key "student_journeys", "journey_stars", column: "journey_stars_id"
  add_foreign_key "student_journeys", "students", on_delete: :cascade
  add_foreign_key "students", "avatars"
  add_foreign_key "students", "users"
  add_foreign_key "users", "roles"
end
