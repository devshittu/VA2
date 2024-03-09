import { DataItem } from "@/components/charts/types";

export function isValidDataItem(row: any): row is DataItem {
    // Required fields validation
    const hasRequiredProps = 
        typeof row.id_trim === 'number' &&
        typeof row.make === 'string' &&
        typeof row.model === 'string' &&
        typeof row.generation === 'string' &&
        typeof row.year_from === 'number';

    if (!hasRequiredProps) return false;

    // Helper functions for optional properties validation
    const isValidOptionalNumberProp = (prop: any): boolean => typeof prop === 'number' || prop === undefined;
    const isValidOptionalStringProp = (prop: any): boolean => typeof prop === 'string' || prop === undefined;
    const isValidOptionalBooleanProp = (prop: any): boolean => typeof prop === 'boolean' || prop === undefined;

    // Validate optional properties
    const hasValidOptionalProps = 
        isValidOptionalNumberProp(row.year_to) &&
        isValidOptionalStringProp(row.series) &&
        isValidOptionalStringProp(row.trim) &&
        isValidOptionalStringProp(row.body_type) &&
        isValidOptionalNumberProp(row.load_height_mm) &&
        isValidOptionalNumberProp(row.number_of_seats) &&
        isValidOptionalNumberProp(row.length_mm) &&
        isValidOptionalNumberProp(row.width_mm) &&
        isValidOptionalNumberProp(row.height_mm) &&
        isValidOptionalNumberProp(row.wheelbase_mm) &&
        isValidOptionalNumberProp(row.front_track_mm) &&
        isValidOptionalNumberProp(row.rear_track_mm) &&
        isValidOptionalNumberProp(row.curb_weight_kg) &&
        isValidOptionalBooleanProp(row.wheel_size_r14) &&
        isValidOptionalNumberProp(row.ground_clearance_mm) &&
        isValidOptionalNumberProp(row.trailer_load_with_brakes_kg) &&
        isValidOptionalNumberProp(row.payload_kg) &&
        isValidOptionalNumberProp(row.back_track_width_mm) &&
        isValidOptionalNumberProp(row.front_track_width_mm) &&
        isValidOptionalNumberProp(row.clearance_mm) &&
        isValidOptionalNumberProp(row.full_weight_kg) &&
        isValidOptionalStringProp(row.front_rear_axle_load_kg) &&
        isValidOptionalNumberProp(row.max_trunk_capacity_l) &&
        isValidOptionalNumberProp(row.cargo_compartment_volume_mm3) &&
        isValidOptionalNumberProp(row.cargo_volume_m3) &&
        isValidOptionalNumberProp(row.minimum_trunk_capacity_l) &&
        isValidOptionalNumberProp(row.maximum_torque_n_m) &&
        isValidOptionalStringProp(row.injection_type) &&
        isValidOptionalStringProp(row.overhead_camshaft) &&
        isValidOptionalStringProp(row.cylinder_layout) &&
        isValidOptionalNumberProp(row.number_of_cylinders) &&
        isValidOptionalStringProp(row.compression_ratio) &&
        isValidOptionalStringProp(row.engine_type) &&
        isValidOptionalNumberProp(row.valves_per_cylinder) &&
        isValidOptionalStringProp(row.boost_type) &&
        isValidOptionalNumberProp(row.cylinder_bore_mm) &&
        isValidOptionalNumberProp(row.stroke_cycle_mm) &&
        isValidOptionalStringProp(row.engine_placement) &&
        isValidOptionalStringProp(row.cylinder_bore_and_stroke_cycle_mm) &&
        isValidOptionalNumberProp(row.turnover_of_maximum_torque_rpm) &&
        isValidOptionalNumberProp(row.max_power_kw) &&
        isValidOptionalBooleanProp(row.presence_of_intercooler) &&
        isValidOptionalNumberProp(row.capacity_cm3) &&
        isValidOptionalNumberProp(row.engine_hp) &&
        isValidOptionalNumberProp(row.engine_hp_rpm) &&
        isValidOptionalStringProp(row.drive_wheels) &&
        isValidOptionalStringProp(row.bore_stroke_ratio) &&
        isValidOptionalNumberProp(row.number_of_gears) &&
        isValidOptionalNumberProp(row.turning_circle_m) &&
        isValidOptionalStringProp(row.transmission) &&
        isValidOptionalStringProp(row.mixed_fuel_consumption_per_100_km_l) &&
        isValidOptionalStringProp(row.range_km) &&
        isValidOptionalStringProp(row.emission_standards) &&
        isValidOptionalNumberProp(row.fuel_tank_capacity_l) &&
        isValidOptionalNumberProp(row.acceleration_0_100_km_h_s) &&
        isValidOptionalNumberProp(row.max_speed_km_per_h) &&
        isValidOptionalNumberProp(row.city_fuel_per_100km_l) &&
        isValidOptionalNumberProp(row.co2_emissions_g_km) &&
        isValidOptionalStringProp(row.fuel_grade) &&
        isValidOptionalNumberProp(row.highway_fuel_per_100km_l) &&
        isValidOptionalStringProp(row.back_suspension) &&
        isValidOptionalStringProp(row.rear_brakes) &&
        isValidOptionalStringProp(row.front_brakes) &&
        isValidOptionalStringProp(row.front_suspension) &&
        isValidOptionalStringProp(row.steering_type) &&
        isValidOptionalStringProp(row.car_class) &&
        isValidOptionalStringProp(row.country_of_origin) &&
        isValidOptionalNumberProp(row.number_of_doors) &&
        isValidOptionalStringProp(row.safety_assessment) &&
        isValidOptionalStringProp(row.rating_name) &&
        isValidOptionalNumberProp(row.battery_capacity_kw_per_h) &&
        isValidOptionalNumberProp(row.electric_range_km) &&
        isValidOptionalNumberProp(row.charging_time_h);

    return hasValidOptionalProps;
}



export function toDataItem(row: Record<string, unknown>): DataItem | undefined {
    if (isValidDataItem(row)) {
        // row is now treated as a DataItem by TypeScript
        return row;
    }
    console.error("Invalid row", row);
    return undefined;
}

