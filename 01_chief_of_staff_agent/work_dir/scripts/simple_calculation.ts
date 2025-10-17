/**
 * Simple script to demonstrate Bash tool usage from an agent.
 * Calculates basic metrics that an AI Chief of Staff might need.
 * Usage: tsx simple_calculation.ts <total_runway> <monthly_burn>
 */

interface Metrics {
  monthly_burn: number;
  runway_months: number;
  total_runway_dollars: number;
  quarterly_burn: number;
  burn_rate_daily: number;
}

function calculateMetrics(totalRunway: number, monthlyBurn: number): Metrics {
  const runwayMonths = totalRunway / monthlyBurn;
  const quarterlyBurn = monthlyBurn * 3;

  const metrics: Metrics = {
    monthly_burn: monthlyBurn,
    runway_months: runwayMonths,
    total_runway_dollars: totalRunway,
    quarterly_burn: quarterlyBurn,
    burn_rate_daily: Math.round((monthlyBurn / 30) * 100) / 100,
  };

  return metrics;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log("Usage: tsx simple_calculation.ts <total_runway> <monthly_burn>");
    process.exit(1);
  }

  try {
    const runway = parseFloat(args[0]);
    const burn = parseFloat(args[1]);

    if (isNaN(runway) || isNaN(burn)) {
      throw new Error("Arguments must be numbers");
    }

    const results = calculateMetrics(runway, burn);

    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.log(`Error: ${error instanceof Error ? error.message : "Arguments must be numbers"}`);
    process.exit(1);
  }
}

main();
